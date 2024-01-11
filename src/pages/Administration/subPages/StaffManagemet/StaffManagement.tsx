import { AdministrationLayout } from '@containers/layouts/Admnistration/AdministrationLayout';
import { StaffManagementViewTable } from '@components/pages/Administration/subPages/StaffManagement/StaffManagementViewTable';
import { useAppDispatch } from '@hooks/storeHooks';
import { useEffect } from 'react';
import { getStaffList, getStaffRoles } from '@store/slices/staffManagement';
export const StaffManagement = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStaffRoles());
    dispatch(getStaffList());
  }, []);

  return (
    <AdministrationLayout navigateBackIcon sx={{ bgcolor: (theme) => theme.palette.surface.default }}>
      <StaffManagementViewTable />
    </AdministrationLayout>
  );
};
