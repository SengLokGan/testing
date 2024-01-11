import { PayloadAction } from '@reduxjs/toolkit';
import { WithDrawerType, DrawerFullPartial, DrawerWithOptionalStatuses } from '@types';
import { DrawerType } from '@enums';
export declare function addDrawerSaga({
  payload: { type },
}: PayloadAction<WithDrawerType<Partial<DrawerWithOptionalStatuses>>>): Generator<
  | import('redux-saga/effects').CallEffect<true>
  | import('redux-saga/effects').PutEffect<{
      payload: DrawerType;
      type: 'drawer/addDrawerSuccess';
    }>,
  void,
  unknown
>;
export declare function updateDrawerSaga({
  payload: { status },
}: PayloadAction<WithDrawerType<DrawerFullPartial>>): Generator<
  | import('redux-saga/effects').PutEffect<{
      payload: undefined;
      type: 'drawer/collapseAllDrawers';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: undefined;
      type: 'drawer/expandAllDrawers';
    }>,
  void,
  unknown
>;
export declare function removeDrawerSaga({ payload: type }: PayloadAction<DrawerType>): Generator<
  | import('redux-saga/effects').CallEffect<true>
  | import('redux-saga/effects').PutEffect<{
      payload: DrawerType;
      type: 'drawer/removeDrawerSuccess';
    }>,
  void,
  unknown
>;
export declare function drawerSagaWatcher(): Generator<import('redux-saga/effects').ForkEffect<never>, void, unknown>;
