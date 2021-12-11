import { createStore, compose, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const configureStore = preLoadedState => createStore(reducers, preLoadedState, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
