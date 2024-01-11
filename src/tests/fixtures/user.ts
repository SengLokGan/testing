import { User } from '@types';
import avatar from '@assets/avatar.png';
import { UserPermissions, UserRoles, ViewPermissions } from '@enums';

export const userFixture = (data: Partial<User> = {}): User => {
  return {
    id: 111,
    firstName: 'UserName',
    lastName: 'UserLastname',
    login: 'Login',
    image: avatar,
    organizations: [
      {
        id: 'dialysis',
        name: 'Dialysis Center',
        branches: [
          {
            id: 'branch1',
            name: 'Dialysis branch 1',
          },
          {
            id: 'branch2',
            name: 'Dialysis branch 2',
          },
        ],
      },
    ],
    currentBranchId: 'branch1',
    currentOrganizationId: 'dialysis',
    roles: [UserRoles.ROLE_NURSE],
    permissions: [
      UserPermissions.PatientAdd,
      UserPermissions.PatientViewDemographics,
      UserPermissions.PatientViewClinicalInfo,
      ViewPermissions.ViewClinicalReports,
      ViewPermissions.ViewAllPatientsFull,
      ViewPermissions.ViewBillingOrder,
      ViewPermissions.ViewBillingPatient,
      ViewPermissions.ViewTodayPatients,
      ViewPermissions.ViewSchedule,
      UserPermissions.IssueModify,
      UserPermissions.PatientModifyAccess,
      UserPermissions.PatientViewAccess,
      UserPermissions.PatientDeleteAccess,
    ],
    hasOpenEncounter: false,
    ...data,
  };
};
