export declare function getClinicalShiftListSaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'clinicalSchedule/getClinicalShiftListSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'clinicalSchedule/setClinicalScheduleError';
      payload: Error;
    }>,
  void,
  {
    data: any;
  }
>;
export declare function clinicalScheduleSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
