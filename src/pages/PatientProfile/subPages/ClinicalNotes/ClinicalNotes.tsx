import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { DrawerType, UserPermissions, ClinicalNoteTypes } from '@enums';
import { useAppDispatch } from '@hooks/storeHooks';
import { useParams } from 'react-router-dom';
import { ClinicalNotesFilters, ClinicalNotesList } from '@components/pages/PatientProfile/subPages';
import { useEffect, useMemo } from 'react';
import {
  addDrawer,
  getClinicalNotesList,
  selectAvailableClinicalNoteTypes,
  selectClinicalNoteForm,
  selectClinicalNotesFilters,
  selectHasActiveDrawers,
  selectUserPermissions,
  setAvailableClinicalNoteTypes,
  setSelectedClinicalNoteType,
} from '@store';
import { ROUTES } from '@constants';
import { GlobalAddButtonWithChips } from '@components/GlobalAddButtonWithChips/GlobalAddButtonWithChips';
import { Dictionaries, getOptionListFromCatalog } from '@utils';
import { ClinicalNoteTypeOptionType } from '@types';

export const ClinicalNotes = () => {
  const { t } = useTranslation('clinicalNotes');
  const { t: tClinicalNoteTypes } = useTranslation(Dictionaries.ClinicalNoteType);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const hasActiveDrawer = selectHasActiveDrawers();
  const userPermissions = selectUserPermissions();
  const filters = selectClinicalNotesFilters();
  const availableClinicalNoteTypes = selectAvailableClinicalNoteTypes();
  const formData = selectClinicalNoteForm();
  const allowedPermissions = [
    UserPermissions.IssueModify,
    UserPermissions.ClinicalNoteDoctorModify,
    UserPermissions.ClinicalNoteNurseModify,
    UserPermissions.NephrologistReviewModify,
    UserPermissions.PICReviewModify,
  ];
  const allClinicalNotesTypes = [
    {
      label: tClinicalNoteTypes(ClinicalNoteTypes.NurseNote),
      permissions: [UserPermissions.ClinicalNoteNurseModify],
    },
    {
      label: tClinicalNoteTypes(ClinicalNoteTypes.DoctorNote),
      permissions: [UserPermissions.ClinicalNoteDoctorModify],
    },
    { label: tClinicalNoteTypes(ClinicalNoteTypes.Issue), permissions: [UserPermissions.IssueModify] },
    {
      label: tClinicalNoteTypes(ClinicalNoteTypes.NephrologistReview),
      permissions: [UserPermissions.NephrologistReviewModify],
    },
    {
      label: tClinicalNoteTypes(ClinicalNoteTypes.PICReview),
      permissions: [UserPermissions.PICReviewModify],
    },
  ];
  const isShowAddButton = allowedPermissions.some((item) => userPermissions.includes(item)) && !hasActiveDrawer;

  const clinicalNoteTypeChips = useMemo(
    () => availableClinicalNoteTypes.map((item) => ({ label: item.label })),
    [availableClinicalNoteTypes],
  );

  const getSelectedClinicalNoteKey = (label: string) => {
    return getOptionListFromCatalog(Dictionaries.ClinicalNoteType)?.find((item) => item.label === label)?.value;
  };

  useEffect(() => {
    formData &&
      dispatch(
        addDrawer({
          type: DrawerType.ClinicalNotesForm,
          payload: { id },
          allowedPathsToShowDrawer: [ROUTES.patientsOverview],
        }),
      );
  }, [formData]);

  useEffect(() => {
    const filteredNoteTypesByPermission = allClinicalNotesTypes.filter((item) =>
      item.permissions.some((permission) => userPermissions.includes(permission)),
    );
    const mappedNoteTypes = filteredNoteTypesByPermission.map((item) => ({
      label: item.label,
      value: getSelectedClinicalNoteKey(item.label),
    }));
    dispatch(setAvailableClinicalNoteTypes(mappedNoteTypes as ClinicalNoteTypeOptionType));
  }, [userPermissions]);

  useEffect(() => {
    id && dispatch(getClinicalNotesList({ patientId: +id }));
  }, [filters, id]);

  return (
    <>
      {isShowAddButton && (
        <GlobalAddButtonWithChips
          chips={clinicalNoteTypeChips}
          onChipClick={(label) => {
            dispatch(setSelectedClinicalNoteType(getSelectedClinicalNoteKey(label) as ClinicalNoteTypes));
            dispatch(
              addDrawer({
                type: DrawerType.ClinicalNotesForm,
                payload: { id },
                allowedPathsToShowDrawer: [ROUTES.patientsOverview],
              }),
            );
          }}
        />
      )}
      <Stack
        direction="column"
        sx={{ width: 1, height: 1, p: 0, backgroundColor: (theme) => theme.palette.surface.default }}
      >
        <Box
          sx={({ palette, spacing }) => ({
            padding: spacing(2, 3),
            borderBottom: `solid 1px ${palette.border.default}`,
          })}
        >
          <Typography data-testid="clinicalNotesPageHeader" variant="headerM">
            {t('clinicalNotes')}
          </Typography>
        </Box>
        <ClinicalNotesFilters />
        <ClinicalNotesList />
      </Stack>
    </>
  );
};
