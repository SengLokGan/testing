import { combineReducers, Reducer } from '@reduxjs/toolkit';
import type { StoreWithDynamicReducers } from '@types';
export declare const reducers: {
  [key: string]: Reducer;
};
export declare const createDynamicReducer: (asyncReducers?: {
  [key: string]: Reducer<any, import('redux').AnyAction>;
}) => ReturnType<typeof combineReducers>;
export declare const reducer: Reducer<
  import('redux').CombinedState<{
    [x: string]: any;
  }>,
  import('redux').AnyAction
>;
export declare const store: StoreWithDynamicReducers;
export declare const runSaga: <S extends import('redux-saga').Saga<any[]>>(
  saga: S,
  ...args: Parameters<S>
) => import('redux-saga').Task<any>;
