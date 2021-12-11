import { selectSource, fetchSourcesIfNeeded } from '@/shared/components/publications/reducer';

export const REQUEST_NEWS = 'REQUEST_NEWS';
export const RECEIVE_NEWS = 'RECEIVE_NEWS';

export const requestNews = sourceId => ({ type: REQUEST_NEWS, sourceId });
const receivedNews = (sourceId, data) => ({ type: RECEIVE_NEWS, sourceId, data });

const shouldFetchNews = (state, sourceId) => {
  if (state.news.sourceId) {
    return !state.news.sourceId.isFetching;
  }
  return true;
};

export const fetchNews = (sourceId, host = '') =>
  (dispatch, getState) => {
    sourceId = sourceId || getState().publications && getState().publications.selectedSource;
    dispatch(selectSource(sourceId));
    dispatch(requestNews(sourceId));
    return fetch(`${host}/api/news/v1/list?source=${sourceId}`)
      .then(response => response.json())
      .then(data => dispatch(receivedNews(sourceId, data.articles)));
  };

export const fetchNewsIfNeeded = sourceId =>
  (dispatch, getState) => {
    if (shouldFetchNews(getState(), sourceId)) {
      return dispatch(fetchNews(sourceId));
    }
    return Promise.resolve();
  };

const newsReducer = (state = { news: {} }, action) => {
  switch (action.type) {
    case REQUEST_NEWS:
      return Object.assign({}, state, {
        ...state,
        [action.sourceId]: {
          isFetching: true,
        },
      });

    case RECEIVE_NEWS:
      return Object.assign({}, state, {
        ...state,
        [action.sourceId]: {
          isFetching: false,
          listOfArticles: action.data,
        },
      });

    default:
      return state;
  }
};

export default newsReducer;
