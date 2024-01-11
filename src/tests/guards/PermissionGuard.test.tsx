import { render } from '../utils';
import { UserPermissions, UserRoles } from '@enums';
import { PermissionGuard } from '@guards';

describe('PermissionGuard', () => {
  const validPermissions = [UserPermissions.DialysisViewPrescriptions];
  const invalidPermissions = [UserPermissions.PatientAdd];
  const validRoles = [UserRoles.ROLE_NURSE];
  const invalidRoles = [UserRoles.ROLE_DOCTOR];
  const text = 'TEST TEXT';

  it('should check that the component is being rendered and permissions check works', () => {
    const { rerender, queryByText } = render(
      <PermissionGuard permissions={validPermissions}>
        <div>{text}</div>
      </PermissionGuard>,
      {
        preloadedState: {
          user: { user: { permissions: validPermissions } },
        },
      },
    );
    expect(queryByText(text)).toBeTruthy();
    rerender(
      <PermissionGuard permissions={invalidPermissions}>
        <div>{text}</div>
      </PermissionGuard>,
    );
    expect(queryByText(text)).toBeFalsy();
  });

  it('should check that the component is being rendered and roles check works', () => {
    const { rerender, queryByText } = render(
      <PermissionGuard roles={validRoles}>
        <div>{text}</div>
      </PermissionGuard>,
      {
        preloadedState: {
          user: { user: { roles: validRoles } },
        },
      },
    );
    expect(queryByText(text)).toBeTruthy();
    rerender(
      <PermissionGuard roles={invalidRoles}>
        <div>{text}</div>
      </PermissionGuard>,
    );
    expect(queryByText(text)).toBeFalsy();
  });
});
