import { PayloadAction } from '@reduxjs/toolkit';
import type { DialysisMachinesEditingRequest, IsolationGroupsResponse, DialysisMachinesCreationRequest } from '@types';
import type { AxiosResponse } from 'axios';
import { DrawerType } from '@enums';
export declare function getDialysisMachinesIsolationGroupsSaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: import('@types').IsolationGroup[];
      type: 'dialysisMachines/getDialysisMachinesIsolationGroupsSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: Error | import('@types').BackendError[] | null;
      type: 'dialysisMachines/addDialysisMachinesError';
    }>,
  void,
  AxiosResponse<IsolationGroupsResponse, any>
>;
export declare function getDialysisMachinesListSaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: Error | import('@types').BackendError[] | null;
      type: 'dialysisMachines/addDialysisMachinesError';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: {
        content: import('@types').DialysisMachine[];
        totalElements: number;
      };
      type: 'dialysisMachines/getDialysisMachinesListSuccess';
    }>,
  void,
  {
    data: any;
  }
>;
export declare function createDialysisMachineSaga({
  payload,
}: PayloadAction<DialysisMachinesCreationRequest>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: import('@types').SnackState & {
        noDuplicates?: boolean | undefined;
        clear?: boolean | undefined;
      };
      type: 'snack/addSnack';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: DrawerType;
      type: 'drawer/removeDrawer';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: Error | import('@types').BackendError[] | null;
      type: 'dialysisMachines/addDialysisMachinesError';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: import('@types').DialysisMachineFull;
      type: 'dialysisMachines/createDialysisMachineSuccess';
    }>,
  void,
  {
    data: any;
  }
>;
export declare function getDialysisMachineSaga({ payload }: PayloadAction<string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: Error | import('@types').BackendError[] | null;
      type: 'dialysisMachines/addDialysisMachinesError';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: import('@types').DialysisMachineFull | null;
      type: 'dialysisMachines/getDialysisMachineSuccess';
    }>,
  void,
  {
    data: any;
  }
>;
export declare function updateDialysisMachineSaga({
  payload: { id, data: requestData },
}: PayloadAction<{
  id: string;
  data: DialysisMachinesEditingRequest;
}>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: import('@types').SnackState & {
        noDuplicates?: boolean | undefined;
        clear?: boolean | undefined;
      };
      type: 'snack/addSnack';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: DrawerType;
      type: 'drawer/removeDrawer';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: Error | import('@types').BackendError[] | null;
      type: 'dialysisMachines/addDialysisMachinesError';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: import('@types').DialysisMachineFull;
      type: 'dialysisMachines/updateDialysisMachineSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: string;
      type: 'dialysisMachines/getDialysisMachine';
    }>,
  void,
  {
    data: any;
  }
>;
export declare function dialysisMachinesSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
