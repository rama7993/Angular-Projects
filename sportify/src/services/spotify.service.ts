import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map, of } from 'rxjs';

export interface SearchOptions {
  query: string;
  type?: string;
  limit?: number;
  offset?: number;
  market?: string;
}

export interface Track {
  id: string;
  name: string;
  artists: any[];
  album: any;
  preview_url: string | null;
  duration_ms: number;
  popularity: number;
  external_urls: any;
}

export interface SearchResponse {
  tracks?: {
    items: Track[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
  };
  playlists?: {
    items: any[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
  };
  albums?: {
    items: any[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
  };
  artists?: {
    items: any[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  /**
   * We keep this service name to avoid touching UI components, but it now uses
   * Deezer via a same-origin SSR proxy (`/api/deezer/*`).
   */
  private apiUrl = '/api/deezer';
  private isBrowser = typeof window !== 'undefined';

  // Audio player state
  private currentTrackSubject = new BehaviorSubject<Track | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private durationSubject = new BehaviorSubject<number>(0);

  public currentTrack$ = this.currentTrackSubject.asObservable();
  public isPlaying$ = this.isPlayingSubject.asObservable();
  public currentTime$ = this.currentTimeSubject.asObservable();
  public duration$ = this.durationSubject.asObservable();

  constructor(private http: HttpClient) {}

  private emptyPaging<T>(limit: number, offset: number) {
    return {
      items: [] as T[],
      total: 0,
      limit,
      offset,
      next: null as string | null,
      previous: null as string | null,
    };
  }

  // ----------------------------------------
  // Deezer -> Spotify-like normalization
  // ----------------------------------------

  private toSpotifyImagesFromDeezerCover(cover?: {
    cover_xl?: string;
    cover_big?: string;
    cover_medium?: string;
    cover_small?: string;
  }): any[] {
    const urls = [
      cover?.cover_xl,
      cover?.cover_big,
      cover?.cover_medium,
      cover?.cover_small,
    ].filter(Boolean) as string[];
    return urls.map((url) => ({ url }));
  }

  private toSpotifyImagesFromDeezerArtistPicture(artist?: {
    picture_xl?: string;
    picture_big?: string;
    picture_medium?: string;
    picture_small?: string;
  }): any[] {
    const urls = [
      artist?.picture_xl,
      artist?.picture_big,
      artist?.picture_medium,
      artist?.picture_small,
    ].filter(Boolean) as string[];
    return urls.map((url) => ({ url }));
  }

  private mapDeezerArtistToSpotifyArtist(artist: any): any {
    if (!artist) return artist;
    return {
      id: String(artist.id ?? ''),
      name: artist.name,
      external_urls: { spotify: artist.link },
      images: this.toSpotifyImagesFromDeezerArtistPicture(artist),
    };
  }

  private mapDeezerAlbumToSpotifyAlbum(album: any): any {
    if (!album) return album;
    const cover = {
      cover_xl: album.cover_xl,
      cover_big: album.cover_big,
      cover_medium: album.cover_medium,
      cover_small: album.cover_small,
    };
    return {
      id: String(album.id ?? ''),
      name: album.title,
      images: this.toSpotifyImagesFromDeezerCover(cover),
      release_date: album.release_date,
      external_urls: { spotify: album.link },
      artist: this.mapDeezerArtistToSpotifyArtist(album.artist),
    };
  }

  private mapDeezerPlaylistToSpotifyPlaylist(playlist: any): any {
    if (!playlist) return playlist;
    const cover = {
      cover_xl: playlist.picture_xl,
      cover_big: playlist.picture_big,
      cover_medium: playlist.picture_medium,
      cover_small: playlist.picture_small,
    };
    return {
      id: String(playlist.id ?? ''),
      name: playlist.title,
      description: playlist.description,
      images: this.toSpotifyImagesFromDeezerCover(cover),
      external_urls: { spotify: playlist.link },
      owner: {
        display_name: playlist.creator?.name || 'Deezer',
      },
      tracks: playlist.tracks,
    };
  }

  private mapDeezerTrackToSpotifyTrack(track: any): Track {
    const album = track?.album
      ? this.mapDeezerAlbumToSpotifyAlbum(track.album)
      : undefined;
    const artist = track?.artist
      ? this.mapDeezerArtistToSpotifyArtist(track.artist)
      : undefined;

    const artists = track?.contributors?.length
      ? track.contributors.map((a: any) => this.mapDeezerArtistToSpotifyArtist(a))
      : artist
        ? [artist]
        : [];

    return {
      id: String(track?.id ?? ''),
      name: track?.title || track?.title_short || '',
      artists,
      album,
      preview_url: track?.preview || null,
      duration_ms: Number(track?.duration || 0) * 1000,
      popularity: Number(track?.rank || 0),
      external_urls: { spotify: track?.link },
    };
  }

  private toSpotifyPaging<T>(
    items: T[],
    total: number,
    limit: number,
    offset: number,
    next: string | null,
  ) {
    return {
      items,
      total,
      limit,
      offset,
      next,
      previous: offset > 0 ? 'prev' : null,
    };
  }

  // ========================================
  // SEARCH API
  // ========================================

  search(options: SearchOptions): Observable<SearchResponse> {
    const limit = options.limit ?? 20;
    const offset = options.offset ?? 0;
    const type = (options.type || 'track').trim();

    // During SSR/prerender, Node's fetch requires absolute URLs; rather than hard-coding
    // an origin, we skip network calls and let the browser hydrate with real data.
    if (!this.isBrowser) {
      if (type === 'artist') return of({ artists: this.emptyPaging<any>(limit, offset) });
      if (type === 'album') return of({ albums: this.emptyPaging<any>(limit, offset) });
      if (type === 'playlist')
        return of({ playlists: this.emptyPaging<any>(limit, offset) });
      return of({ tracks: this.emptyPaging<Track>(limit, offset) });
    }

    const params = new HttpParams()
      .set('q', options.query)
      .set('type', type)
      .set('limit', String(limit))
      .set('index', String(offset));

    return this.http.get<any>(`${this.apiUrl}/search`, { params }).pipe(
      map((deezer) => {
        const itemsRaw = Array.isArray(deezer?.data) ? deezer.data : [];
        const total = Number(deezer?.total || itemsRaw.length || 0);
        const next: string | null = deezer?.next || null;

        if (type === 'track') {
          const items = itemsRaw.map((t: any) => this.mapDeezerTrackToSpotifyTrack(t));
          return { tracks: this.toSpotifyPaging(items, total, limit, offset, next) };
        }
        if (type === 'artist') {
          const items = itemsRaw.map((a: any) => this.mapDeezerArtistToSpotifyArtist(a));
          return { artists: this.toSpotifyPaging(items, total, limit, offset, next) };
        }
        if (type === 'album') {
          const items = itemsRaw.map((a: any) => this.mapDeezerAlbumToSpotifyAlbum(a));
          return { albums: this.toSpotifyPaging(items, total, limit, offset, next) };
        }
        if (type === 'playlist') {
          const items = itemsRaw.map((p: any) =>
            this.mapDeezerPlaylistToSpotifyPlaylist(p),
          );
          return { playlists: this.toSpotifyPaging(items, total, limit, offset, next) };
        }

        // Default fallback
        const items = itemsRaw.map((t: any) => this.mapDeezerTrackToSpotifyTrack(t));
        return { tracks: this.toSpotifyPaging(items, total, limit, offset, next) };
      }),
    );
  }

  searchAll(
    query: string,
    limit: number = 20,
    offset: number = 0,
  ): Observable<any> {
    if (!this.isBrowser) {
      return of({
        tracks: this.emptyPaging<Track>(limit, offset),
        artists: this.emptyPaging<any>(limit, offset),
        albums: this.emptyPaging<any>(limit, offset),
        playlists: this.emptyPaging<any>(limit, offset),
      });
    }
    return forkJoin({
      tracks: this.search({ query, type: 'track', limit, offset }),
      artists: this.search({ query, type: 'artist', limit, offset }),
      albums: this.search({ query, type: 'album', limit, offset }),
      playlists: this.search({ query, type: 'playlist', limit, offset }),
    }).pipe(
      map((r) => ({
        tracks: r.tracks.tracks,
        artists: r.artists.artists,
        albums: r.albums.albums,
        playlists: r.playlists.playlists,
      })),
    );
  }

  // ========================================
  // CATEGORIES API
  // ========================================

  getCategories(
    limit: number = 20,
    offset: number = 0,
  ): Observable<any> {
    if (!this.isBrowser) {
      return of({ categories: { items: [] } });
    }
    const categoryIds = Object.keys(this.getCategoryMappings());
    const items = categoryIds.slice(offset, offset + limit).map((id) => ({
      id,
      name: this.prettyCategoryName(id),
      icons: [],
    }));
    return of({ categories: { items } });
  }

  getCategory(categoryId: string): Observable<any> {
    if (!this.isBrowser) {
      return of({ id: categoryId, name: this.prettyCategoryName(categoryId), icons: [] });
    }
    return of({
      id: categoryId,
      name: this.prettyCategoryName(categoryId),
      icons: [],
    });
  }

  // Get playlists by category using search API (replacement for deprecated category playlists)
  getPlaylistsByCategory(
    categoryId: string,
    limit: number = 20,
    offset: number = 0,
  ): Observable<any> {
    if (!this.isBrowser) {
      return of({ playlists: this.emptyPaging<any>(limit, offset) });
    }
    const searchTerms = this.getCategorySearchTerms(categoryId);
    return this.search({
      query: searchTerms,
      type: 'playlist',
      limit,
      offset,
    });
  }

  private getCategoryMappings(): { [key: string]: string } {
    return {
      pop: 'pop music',
      rock: 'rock music',
      'hip-hop': 'hip hop rap',
      jazz: 'jazz music',
      classical: 'classical music',
      electronic: 'electronic dance music',
      country: 'country music',
      'r-b': 'r&b soul',
      blues: 'blues music',
      folk: 'folk music',
      reggae: 'reggae music',
      funk: 'funk music',
      soul: 'soul music',
      disco: 'disco music',
      punk: 'punk rock',
      indie: 'indie alternative',
      alternative: 'alternative rock',
      metal: 'heavy metal',
      gospel: 'gospel music',
      latin: 'latin music',
      world: 'world music',
      'new-age': 'new age music',
      ambient: 'ambient music',
      trance: 'trance music',
      house: 'house music',
      techno: 'techno music',
      dubstep: 'dubstep music',
      'drum-and-bass': 'drum and bass',
      trap: 'trap music',
      'lo-fi': 'lo-fi hip hop',
      chill: 'chill music',
      focus: 'focus study music',
      workout: 'workout fitness music',
      party: 'party music',
      romance: 'romantic music',
      sleep: 'sleep relaxation music',
      travel: 'travel music',
      kids: 'kids children music',
      comedy: 'comedy music',
      soundtrack: 'movie soundtrack',
      holiday: 'holiday christmas music',
      dinner: 'dinner music',
      equal: 'equal music',
      mood: 'mood music',
      decades: 'decades music',
      instrumental: 'instrumental music',
      acoustic: 'acoustic music',
      live: 'live music',
      cover: 'cover songs',
      remix: 'remix music',
      telugu: 'telugu music',
      tamil: 'tamil music',
      hindi: 'hindi music',
      malayalam: 'malayalam music',
      kannada: 'kannada music',
    };
  }

  private getCategorySearchTerms(categoryId: string): string {
    const categoryMappings = this.getCategoryMappings();
    const lowerCategoryId = categoryId.toLowerCase();
    return categoryMappings[lowerCategoryId] || categoryId.replace(/-/g, ' ');
  }

  private prettyCategoryName(categoryId: string): string {
    return categoryId
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase());
  }

  // ========================================
  // TRACKS API
  // ========================================

  getTracks(ids: string): Observable<any> {
    if (!this.isBrowser) {
      return of({ tracks: [] });
    }
    const idList = String(ids || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (idList.length <= 1) {
      const id = idList[0] || String(ids || '').trim();
      return this.http.get<any>(`${this.apiUrl}/track/${encodeURIComponent(id)}`).pipe(
        map((t) => ({ tracks: [this.mapDeezerTrackToSpotifyTrack(t)] })),
      );
    }

    return forkJoin(
      idList.map((id) =>
        this.http
          .get<any>(`${this.apiUrl}/track/${encodeURIComponent(id)}`)
          .pipe(map((t) => this.mapDeezerTrackToSpotifyTrack(t))),
      ),
    ).pipe(map((tracks) => ({ tracks })));
  }

  // ========================================
  // ARTISTS API
  // ========================================

  getArtists(ids: string): Observable<any> {
    if (!this.isBrowser) {
      return of({ artists: [] });
    }
    const idList = String(ids || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (idList.length <= 1) {
      const id = idList[0] || String(ids || '').trim();
      return this.http
        .get<any>(`${this.apiUrl}/artist/${encodeURIComponent(id)}`)
        .pipe(map((a) => ({ artists: [this.mapDeezerArtistToSpotifyArtist(a)] })));
    }

    return forkJoin(
      idList.map((id) =>
        this.http
          .get<any>(`${this.apiUrl}/artist/${encodeURIComponent(id)}`)
          .pipe(map((a) => this.mapDeezerArtistToSpotifyArtist(a))),
      ),
    ).pipe(map((artists) => ({ artists })));
  }

  getArtistAlbums(
    artistId: string,
    limit: number = 20,
    offset: number = 0,
  ): Observable<any> {
    if (!this.isBrowser) {
      return of({ items: [], total: 0, limit, offset });
    }
    const params = new HttpParams()
      .set('limit', String(limit))
      .set('index', String(offset));

    return this.http
      .get<any>(`${this.apiUrl}/artist/${encodeURIComponent(artistId)}/albums`, {
        params,
      })
      .pipe(
        map((r) => ({
          items: Array.isArray(r?.data)
            ? r.data.map((a: any) => this.mapDeezerAlbumToSpotifyAlbum(a))
            : [],
          total: Number(r?.total || 0),
          limit,
          offset,
        })),
      );
  }

  getArtistTopTracks(artistId: string, _market: string = 'IN'): Observable<any> {
    if (!this.isBrowser) {
      return of({ tracks: [] });
    }
    const params = new HttpParams().set('limit', '10');
    return this.http
      .get<any>(`${this.apiUrl}/artist/${encodeURIComponent(artistId)}/top`, {
        params,
      })
      .pipe(
        map((r) => ({
          tracks: Array.isArray(r?.data)
            ? r.data.map((t: any) => this.mapDeezerTrackToSpotifyTrack(t))
            : [],
        })),
      );
  }

  // ========================================
  // ALBUMS API
  // ========================================

  getAlbums(ids: string): Observable<any> {
    if (!this.isBrowser) {
      return of({ albums: [] });
    }
    const idList = String(ids || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (idList.length <= 1) {
      const id = idList[0] || String(ids || '').trim();
      return this.http
        .get<any>(`${this.apiUrl}/album/${encodeURIComponent(id)}`)
        .pipe(map((a) => ({ albums: [this.mapDeezerAlbumToSpotifyAlbum(a)] })));
    }

    return forkJoin(
      idList.map((id) =>
        this.http
          .get<any>(`${this.apiUrl}/album/${encodeURIComponent(id)}`)
          .pipe(map((a) => this.mapDeezerAlbumToSpotifyAlbum(a))),
      ),
    ).pipe(map((albums) => ({ albums })));
  }

  getAlbumTracks(
    albumId: string,
    limit: number = 20,
    offset: number = 0,
  ): Observable<any> {
    if (!this.isBrowser) {
      return of({ items: [], total: 0, limit, offset });
    }
    return this.http
      .get<any>(`${this.apiUrl}/album/${encodeURIComponent(albumId)}/tracks`)
      .pipe(
        map((r) => {
          const data = Array.isArray(r?.data) ? r.data : r?.items || [];
          const mapped = (data || []).map((t: any) =>
            this.mapDeezerTrackToSpotifyTrack(t),
          );
          const sliced = mapped.slice(offset, offset + limit);
          return { items: sliced, total: mapped.length, limit, offset };
        }),
      );
  }

  getNewReleases(limit: number = 20, offset: number = 0): Observable<any> {
    if (!this.isBrowser) {
      return of({ albums: { items: [] } });
    }
    return this.http.get<any>(`${this.apiUrl}/chart`).pipe(
      map((chart) => {
        const albums = Array.isArray(chart?.albums?.data) ? chart.albums.data : [];
        const mapped = albums.map((a: any) => this.mapDeezerAlbumToSpotifyAlbum(a));
        const sliced = mapped.slice(offset, offset + limit);
        return {
          albums: this.toSpotifyPaging(
            sliced,
            mapped.length,
            limit,
            offset,
            null,
          ),
        };
      }),
      map((r) => ({ albums: r.albums ? { items: r.albums.items } : r.albums })),
    );
  }

  // ========================================
  // PLAYLISTS API
  // ========================================

  getPlaylist(playlistId: string): Observable<any> {
    if (!this.isBrowser) {
      return of(null);
    }
    return this.http
      .get<any>(`${this.apiUrl}/playlist/${encodeURIComponent(playlistId)}`)
      .pipe(map((p) => this.mapDeezerPlaylistToSpotifyPlaylist(p)));
  }

  getPlaylistTracks(
    playlistId: string,
    limit: number = 20,
    offset: number = 0,
  ): Observable<any> {
    if (!this.isBrowser) {
      return of({ items: [], total: 0, limit, offset });
    }
    return this.http
      .get<any>(`${this.apiUrl}/playlist/${encodeURIComponent(playlistId)}/tracks`)
      .pipe(
        map((r) => {
          const data = Array.isArray(r?.data) ? r.data : [];
          const mapped = data.map((t: any) => this.mapDeezerTrackToSpotifyTrack(t));
          const sliced = mapped.slice(offset, offset + limit);
          return {
            items: sliced.map((track: any) => ({ track })),
            total: mapped.length,
            limit,
            offset,
          };
        }),
      );
  }

  // ========================================
  // AUDIO PLAYER METHODS
  // ========================================

  playTrack(track: Track): void {
    this.currentTrackSubject.next(track);
    this.isPlayingSubject.next(true);
  }

  playTrackDirectly(track: Track): void {
    // Play track directly without any preview fetching logic
    this.currentTrackSubject.next(track);
    this.isPlayingSubject.next(true);
  }

  pauseTrack(): void {
    this.isPlayingSubject.next(false);
  }

  resumeTrack(): void {
    this.isPlayingSubject.next(true);
  }

  stopTrack(): void {
    this.isPlayingSubject.next(false);
    this.currentTimeSubject.next(0);
  }

  updateCurrentTime(time: number): void {
    this.currentTimeSubject.next(time);
  }

  updateDuration(duration: number): void {
    this.durationSubject.next(duration);
  }

  // ========================================
  // PREVIEW URL UTILITIES
  // ========================================

  // Method to check if a track has a working preview URL
  hasPreviewUrl(track: any): boolean {
    return !!(track && track.preview_url && track.preview_url.trim() !== '');
  }

  // Method to get a user-friendly message for tracks without previews
  getPreviewStatusMessage(track: any): string {
    if (this.hasPreviewUrl(track)) {
      return 'Preview available';
    }
    return 'No preview available';
  }

  // Method to get Spotify URL for a track
  getSpotifyUrl(track: any): string | null {
    return track?.external_urls?.spotify || null;
  }

  // Method to open track in Spotify
  openInSpotify(track: any): void {
    const spotifyUrl = this.getSpotifyUrl(track);
    if (spotifyUrl) {
      window.open(spotifyUrl, '_blank');
    } else {
      console.warn('No Spotify URL available for this track');
    }
  }

  /**
   * Backwards-compatible hook used by the UI. Deezer already provides `preview`,
   * so this is now mostly a no-op.
   */
  async enhanceTrackWithPreview(track: any): Promise<any> {
    return track;
  }
}
