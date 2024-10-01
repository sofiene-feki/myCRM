import { combineReducers } from 'redux';
import { drawerReducer } from './drawerReducer';
import { quickFilterReducer } from './quickFilterReducer';
import { userReducer } from './userReducer';
import { filtersReducer } from './filtersReducer';
import { paginationAndSortReducer  } from './paginationAndSortReducer ';
import darkModeReducer from './darkModeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  drawer: drawerReducer,
  quickFilter: quickFilterReducer,
  filters : filtersReducer,
  paginationAndSortReducer : paginationAndSortReducer ,
  darkMode: darkModeReducer,
});

export default rootReducer;
