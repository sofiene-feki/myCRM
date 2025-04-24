import { combineReducers } from 'redux';
import { drawerReducer } from './drawerReducer';
import { quickFilterReducer } from './quickFilterReducer';
import { userReducer } from './userReducer';
import { filtersReducer } from './filtersReducer';
import { paginationAndSortReducer } from './paginationAndSortReducer ';
import darkModeReducer from './darkModeReducer';
import { replaceReducer } from './replaceReducer';

const rootReducer = combineReducers({
  user: userReducer,
  drawer: drawerReducer,
  quickFilter: quickFilterReducer,
  filters: filtersReducer,
  paginationAndSortReducer: paginationAndSortReducer,
  darkMode: darkModeReducer,
  replace: replaceReducer,
});

export default rootReducer;
