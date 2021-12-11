import { combineReducers } from 'redux';
import publications from '@/shared/components/publications/reducer';
import news from '@/shared/components/news/reducer';

const reducers = combineReducers({
  publications,
  news,
});

export default reducers;
