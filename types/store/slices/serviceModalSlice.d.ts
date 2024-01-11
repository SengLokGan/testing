import { PayloadAction } from '@reduxjs/toolkit';
import { ServiceModalName } from '@enums/components/ServiceModal';
import type { ServiceModalSliceState } from '@types';
export declare const serviceModalSlice: import('@reduxjs/toolkit').Slice<
  ServiceModalSliceState,
  {
    addServiceModal: (
      state: import('immer/dist/internal').WritableDraft<ServiceModalSliceState>,
      {
        payload: { name, payload },
      }: {
        payload: {
          name: ServiceModalName;
          payload: any;
        };
        type: string;
      },
    ) => void;
    removeServiceModal: (
      state: import('immer/dist/internal').WritableDraft<ServiceModalSliceState>,
      { payload }: PayloadAction<ServiceModalName>,
    ) => void;
  },
  'modal'
>;
export declare const addServiceModal: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      name: ServiceModalName;
      payload: any;
    },
    'modal/addServiceModal'
  >,
  removeServiceModal: import('@reduxjs/toolkit').ActionCreatorWithPayload<ServiceModalName, 'modal/removeServiceModal'>;
export declare const selectServiceModal: (modalName: ServiceModalName) => any;
export declare const selectServiceModals: () => any;
export declare const selectHasServiceModal: () => boolean;
declare const serviceModalReducer: import('redux').Reducer<ServiceModalSliceState, import('redux').AnyAction>;
export default serviceModalReducer;
