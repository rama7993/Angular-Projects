import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // ----------------------------------------
  // Deezer API proxy (avoids browser CORS)
  // ----------------------------------------
  const DEEZER_API = 'https://api.deezer.com';

  function setCacheHeaders(res: express.Response) {
    // Short cache to reduce API calls, while staying reasonably fresh.
    res.setHeader('Cache-Control', 'public, max-age=60');
  }

  async function proxyDeezer(
    deezerPathWithQuery: string,
    req: express.Request,
    res: express.Response,
  ) {
    try {
      const url = `${DEEZER_API}${deezerPathWithQuery}`;
      const upstream = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      const text = await upstream.text();
      res.status(upstream.status);
      res.setHeader(
        'Content-Type',
        upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      );
      setCacheHeaders(res);
      res.send(text);
    } catch (error: any) {
      res.status(502);
      res.json({
        error: 'Deezer proxy failed',
        message: error?.message || String(error),
      });
    }
  }

  server.get('/api/deezer/search', (req, res) => {
    const q = String(req.query['q'] || '').trim();
    const type = String(req.query['type'] || 'track').trim();
    const limit = Number(req.query['limit'] || 20);
    const index = Number(req.query['index'] || 0);

    const safeLimit = Number.isFinite(limit)
      ? Math.max(1, Math.min(50, limit))
      : 20;
    const safeIndex = Number.isFinite(index) ? Math.max(0, index) : 0;

    // Deezer endpoints:
    // - /search?q=...
    // - /search/artist?q=...
    // - /search/album?q=...
    // - /search/playlist?q=...
    const endpoint =
      type && type !== 'track'
        ? `/search/${encodeURIComponent(type)}`
        : '/search';

    const qs = new URLSearchParams({
      q,
      limit: String(safeLimit),
      index: String(safeIndex),
    });

    return void proxyDeezer(`${endpoint}?${qs.toString()}`, req, res);
  });

  server.get('/api/deezer/track/:id', (req, res) => {
    const id = encodeURIComponent(String(req.params['id'] || ''));
    return void proxyDeezer(`/track/${id}`, req, res);
  });

  server.get('/api/deezer/artist/:id', (req, res) => {
    const id = encodeURIComponent(String(req.params['id'] || ''));
    return void proxyDeezer(`/artist/${id}`, req, res);
  });

  server.get('/api/deezer/artist/:id/albums', (req, res) => {
    const id = encodeURIComponent(String(req.params['id'] || ''));
    const limit = Number(req.query['limit'] || 20);
    const index = Number(req.query['index'] || 0);
    const safeLimit = Number.isFinite(limit)
      ? Math.max(1, Math.min(200, limit))
      : 20;
    const safeIndex = Number.isFinite(index) ? Math.max(0, index) : 0;

    const qs = new URLSearchParams({
      limit: String(safeLimit),
      index: String(safeIndex),
    });
    return void proxyDeezer(`/artist/${id}/albums?${qs.toString()}`, req, res);
  });

  server.get('/api/deezer/artist/:id/top', (req, res) => {
    const id = encodeURIComponent(String(req.params['id'] || ''));
    const limit = Number(req.query['limit'] || 10);
    const safeLimit = Number.isFinite(limit)
      ? Math.max(1, Math.min(50, limit))
      : 10;

    const qs = new URLSearchParams({ limit: String(safeLimit) });
    return void proxyDeezer(`/artist/${id}/top?${qs.toString()}`, req, res);
  });

  server.get('/api/deezer/album/:id', (req, res) => {
    const id = encodeURIComponent(String(req.params['id'] || ''));
    return void proxyDeezer(`/album/${id}`, req, res);
  });

  server.get('/api/deezer/album/:id/tracks', (req, res) => {
    const id = encodeURIComponent(String(req.params['id'] || ''));
    return void proxyDeezer(`/album/${id}/tracks`, req, res);
  });

  server.get('/api/deezer/playlist/:id', (req, res) => {
    const id = encodeURIComponent(String(req.params['id'] || ''));
    return void proxyDeezer(`/playlist/${id}`, req, res);
  });

  server.get('/api/deezer/playlist/:id/tracks', (req, res) => {
    const id = encodeURIComponent(String(req.params['id'] || ''));
    return void proxyDeezer(`/playlist/${id}/tracks`, req, res);
  });

  server.get('/api/deezer/chart', (req, res) => {
    return void proxyDeezer('/chart', req, res);
  });

  server.get('/api/deezer/genre', (req, res) => {
    return void proxyDeezer('/genre', req, res);
  });

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
