import 'source-map-support/register';
import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';
import request from 'request';

import routes from '../shared/routes';
import configureStore from '../shared/store';
import initialState from '../shared/store/initialState';
import App from '../shared/App';
import { fetchSources } from '../shared/components/publications/reducer';
import { IS_PROD, getBundleChunkNameByHack } from './utils';

const numDaysForCache = 86400 * (process.env.NUM_DAYS_FOR_CACHE || 4);
const FILE_EXTENSION_REGEX = /\.([a-z]+)$/;
const HOST_EP = 'http://localhost:8081';
const options = {
  dotfiles: 'ignore',
  index: false,
  redirect: false,
  setHeaders: (res, path) => {
    let fileExtension = FILE_EXTENSION_REGEX.exec(path);
    if (!fileExtension) return;
    fileExtension = fileExtension[1];
    if (fileExtension === 'html') {
      res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.set('Expires', '-1');
      res.set('Pragma', 'no-cache');
      return;
    }
    res.set('x-timestamp', Date.now());
    res.header('Cache-Control', `public, max-age=${numDaysForCache}`);
    res.removeHeader('ETag');
    res.removeHeader('Last-Modified');
  },
};

const BUNDLE_FILE_NAME = getBundleChunkNameByHack('public', 'main-', 'main.dev.js');
console.log(`BUNDLE_FILE_NAME: ${BUNDLE_FILE_NAME}`);

const app = express();
app.use(cors());
app.use(express.static('public', options));
app.get('/api/news/v1/source/list', (req, res) => res.json(require('./data/publications.json')));
app.get('/api/news/v1/list', (req, res) => res.json(require(`./data/${req.query.source}.json`)));

app.get('*', (req, res, next) => {
  // initialize the store
  const store = configureStore(initialState);
  // fetching news sources, as its bootstrap call for all further APIs
  store.dispatch(fetchSources(HOST_EP))
    .then(() => {
      // on resolve we match route
      const promises = routes.reduce((acc, route) => {
        if (matchPath(req.url, route) && route.component && route.component.initialAction) {
          // push matched route specfic dispatch if any
          acc.push(Promise.resolve(store.dispatch(route.component.initialAction(HOST_EP))));
        }
        return acc;
      }, []);
      // perform Promise all on all accumulated promises and resolve render markup
      Promise.all(promises)
        .then(() => {
          const context = {};
          const markup = renderToString(<Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </Provider>);
          const initialData = store.getState();
          res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>News</title>
                <meta charset="utf-8">
                <meta http-equiv="Cache-control" content="public">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
                <link rel="stylesheet" href="/css/main.css">
                <script src="/${BUNDLE_FILE_NAME}" defer></script>
                <script>window.__initialData__ = ${serialize(initialData)}</script>
              </head>
              <body>
                <div id="root">${markup}</div>
              </body>
            </html>
          `);
        })
        .catch(next);
    });
});

app.listen(process.env.PORT || 8081, () => {
  console.log('Server is listening');
});
