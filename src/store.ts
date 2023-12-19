
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
