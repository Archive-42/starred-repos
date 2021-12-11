import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import sessionReducer from './session';
import tasksReducer from './tasks'
import usersReducer from './users'
import localsReducer from './search'
import helpingHandsReducer from './helpingHands'
import testimonyReducer from './testimony'

const rootReducer = combineReducers({
  session: sessionReducer,
  tasks: tasksReducer,
  users: usersReducer,
  locals: localsReducer,
  helpingHands: helpingHandsReducer,
  testimony: testimonyReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk)
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;