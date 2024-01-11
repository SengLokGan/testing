import type { Injection } from '@types';
import Checkbox from '@mui/material/Checkbox';
import { TodayInjectionsTableInjectionWrapper } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTableInjectionWrapper';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  selectTodayPatientsFilterDate,
  selectTodayPatientsInjectionsLoading,
  selectUserPermissions,
  updateTodayPatientsInjectionPrepared,
} from '@store/slices';
import { getTenantEndCurrentDay, getTenantStartCurrentDay } from '@utils/getTenantDate';
import { validatorDateIsInRange } from '@validators/validatorDateIsInRange';
import React, { useMemo } from 'react';
import { InjectionType } from '@enums/global';
import { UserPermissions } from '@enums/store';

type TodayInjectionsTablePreparedColumnProps = {
  injections: Injection[];
  appointmentId: number;
};

export const TodayInjectionsTablePreparedColumn = ({
  appointmentId,
  injections,
}: TodayInjectionsTablePreparedColumnProps) => {
  const dispatch = useAppDispatch();
  const isLoading = selectTodayPatientsInjectionsLoading();
  const userPermissions = selectUserPermissions();
  const filterDate = selectTodayPatientsFilterDate();
  const checkPossibilityIsDisabled = !userPermissions.includes(UserPermissions.DialysisInjectionPrepared);
  const isTodayFilterDate = useMemo(
    () =>
      validatorDateIsInRange({
        dateFrom: getTenantStartCurrentDay(),
        dateTo: getTenantEndCurrentDay(),
      })(new Date(filterDate)) === true,
    [filterDate],
  );

  const onCheck = (id: number, event: React.ChangeEvent<HTMLInputElement>, type: InjectionType) => {
    dispatch(
      updateTodayPatientsInjectionPrepared({
        id,
        appointmentId,
        type,
        status: event.target.checked,
      }),
    );
  };

  return (
    <>
      {injections.map(({ prepared, id, type }) => (
        <TodayInjectionsTableInjectionWrapper key={`injection-checkbox-${id}`} sx={{ justifyContent: 'center' }}>
          <Checkbox
            checked={prepared}
            onChange={(value) => onCheck(id, value, type)}
            sx={{ p: 0, borderRadius: 0 }}
            disabled={isLoading || checkPossibilityIsDisabled || !isTodayFilterDate}
          />
        </TodayInjectionsTableInjectionWrapper>
      ))}
    </>
  );
};
