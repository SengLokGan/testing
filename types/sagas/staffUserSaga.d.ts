import type { PayloadAction } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import type { Staff } from '@types';
export declare function getStaffUserInfoSaga({ payload: id }: PayloadAction<string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: Staff;
      type: 'staffUser/getStaffUserInfoSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'staffUser/addStaffUserError';
      payload: any;
    }>,
  void,
  AxiosResponse<Staff, any>
>;
export declare function staffUserSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
