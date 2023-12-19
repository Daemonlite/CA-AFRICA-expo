// src/reducers/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import albumReducer from './albumReducer';

const rootReducer = combineReducers({
  albums: albumReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
