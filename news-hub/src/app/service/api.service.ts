import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author?: string;
  content?: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults?: number;
  status?: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  country?: string;
  language?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Get top headlines
  getTopHeadlines(params?: SearchParams): Observable<NewsResponse> {
    const httpParams = new HttpParams()
      .set('token', environment.gnewsApiKey)
      .set('lang', params?.language || environment.defaultLanguage)
      .set('country', params?.country || environment.defaultCountry)
      .set('max', (params?.pageSize || environment.pageSize).toString());

    return this.http
      .get<any>(`${environment.gnewsBaseUrl}/top-headlines`, {
        params: httpParams,
      })
      .pipe(
        map((response) => ({
          articles:
            response.articles?.map((article: any) => ({
              title: article.title,
              description: article.description,
              url: article.url,
              urlToImage: article.image,
              publishedAt: article.publishedAt,
              source: { name: article.source?.name || 'Unknown' },
              author: article.source?.name,
            })) || [],
          totalResults: response.totalArticles || 0,
        }))
      );
  }

  // Get news by category
  getNewsByCategory(
    category: string,
    params?: SearchParams
  ): Observable<NewsResponse> {
    const httpParams = new HttpParams()
      .set('token', environment.gnewsApiKey)
      .set('topic', category)
      .set('lang', params?.language || environment.defaultLanguage)
      .set('max', (params?.pageSize || environment.pageSize).toString());

    return this.http
      .get<any>(`${environment.gnewsBaseUrl}/top-headlines`, {
        params: httpParams,
      })
      .pipe(
        map((response) => ({
          articles:
            response.articles?.map((article: any) => ({
              title: article.title,
              description: article.description,
              url: article.url,
              urlToImage: article.image,
              publishedAt: article.publishedAt,
              source: { name: article.source?.name || 'Unknown' },
              author: article.source?.name,
            })) || [],
          totalResults: response.totalArticles || 0,
        }))
      );
  }

  // Search news
  searchNews(query: string, params?: SearchParams): Observable<NewsResponse> {
    const httpParams = new HttpParams()
      .set('token', environment.gnewsApiKey)
      .set('q', query)
      .set('lang', params?.language || environment.defaultLanguage)
      .set('max', (params?.pageSize || environment.pageSize).toString());

    return this.http
      .get<any>(`${environment.gnewsBaseUrl}/search`, { params: httpParams })
      .pipe(
        map((response) => ({
          articles:
            response.articles?.map((article: any) => ({
              title: article.title,
              description: article.description,
              url: article.url,
              urlToImage: article.image,
              publishedAt: article.publishedAt,
              source: { name: article.source?.name || 'Unknown' },
              author: article.source?.name,
            })) || [],
          totalResults: response.totalArticles || 0,
        }))
      );
  }

  // Get news by country
  getNewsByCountry(
    country: string,
    params?: SearchParams
  ): Observable<NewsResponse> {
    const searchParams = { ...params, country };
    return this.getTopHeadlines(searchParams);
  }

  // Legacy methods for backward compatibility
  topHeading(): Observable<NewsResponse> {
    return this.getTopHeadlines();
  }

  technews(): Observable<NewsResponse> {
    return this.getNewsByCategory('technology');
  }
}
