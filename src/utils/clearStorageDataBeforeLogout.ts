export const clearStorageDataBeforeLogout = () => {
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('currentOrganizationId');
  localStorage.removeItem('currentBranchId');
  localStorage.removeItem('initData');
};
