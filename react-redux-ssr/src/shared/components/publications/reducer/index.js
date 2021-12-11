import fetch from 'isomorphic-fetch';

export const REQUEST_SOURCES = 'REQUEST_SOURCES';
export const RECEIVE_SOURCES = 'RECEIVE_SOURCES';
export const SELECT_SOURCE = 'SELECT_SOURCE';

const requestSources = () => ({ type: REQUEST_SOURCES });
const receivedSources = data => ({ type: RECEIVE_SOURCES, data });
export const selectSource = sourceId => ({ type: SELECT_SOURCE, sourceId });

const shouldFetchSources = state => !state.publications.isFetching;

export const fetchSourcesIfNeeded = () =>
  (dispatch, getState) => {
    if (shouldFetchSources(getState())) {
      return dispatch(fetchSources());
    }
    return Promise.resolve();
  };

export const fetchSources = (host = '') =>
  (dispatch) => {
    dispatch(requestSources());
    return fetch(`${host}/api/news/v1/source/list?country=in&language=en`)
      .then(response => response.json())
      .then(data => dispatch(receivedSources(data.sources)));
  };

const sourcesReducer = (state = {
  selectedSource: 'toi-in',
  isFetching: false,
  listOfNewsSources: [],
}, action) => {
  switch (action.type) {
    case SELECT_SOURCE:
      return Object.assign({}, state, {
        ...state,
        selectedSource: action.sourceId,
      });
    case REQUEST_SOURCES:
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    case RECEIVE_SOURCES:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        listOfNewsSources: action.data,
        selectedSource: action.data.length > 0 ? action.data[0].sourceId : null,
      });
    default:
      return state;
  }
};

export default sourcesReducer;
