import { useEffect } from 'react';
import { DrawerType } from '@enums';
import { updateDrawer } from '@store/slices/drawerSlice';
import { useAppDispatch } from '@hooks/storeHooks';

export function useUpdateDrawerStatuses(type: DrawerType, isDirty: boolean): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateDrawer({ type, statuses: { isDirty } }));
  }, [type, isDirty]);
}
