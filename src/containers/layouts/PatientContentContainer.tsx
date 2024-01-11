import { useEffect, useMemo, useRef } from 'react';
import { MainContentContainer } from '@src/containers';
import { SideBar } from './SideBar';
import { WithSx } from '@types';
import Box from '@mui/material/Box';
import { convertSxToArray } from '@utils/converters/mui';
import {
  clearPatientData,
  getPatientDemographics,
  getPatientStatusHistory,
  selectPatientId,
  selectPatientName,
  selectPatientStatus,
  selectPatientStatusesHistory,
} from '@store/slices';
import { Outlet, useParams } from 'react-router-dom';
import { useAppDispatch } from '@hooks/storeHooks';
import { patientMenuBackExceptions, patientMenuItems } from '@containers/layouts/SideBar/constants';
import { PatientStatuses } from '@enums/global';
import { BackNavigation } from '@containers/layouts/BackNavigation/BackNavigation';
import Stack from '@mui/material/Stack';
import { backNavigationHeight } from '@src/constants';
import { ScrollToTopButton } from '@components/ScrollToTopButton/ScrollToTopButton';
import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

type PatientLayoutProps = WithSx<{
  fullHeight?: boolean;
}>;

export const PatientContentContainer = ({ fullHeight = false, sx }: PatientLayoutProps) => {
  const dispatch = useAppDispatch();
  const patientName = selectPatientName();
  const patientId = selectPatientId();
  const { id } = useParams();
  const status = selectPatientStatus();
  const statusesHistory = selectPatientStatusesHistory();
  const containerRef = useRef(null);
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (id && patientId !== Number(id)) {
      dispatch(getPatientDemographics(id));
      dispatch(getPatientStatusHistory(id));
    }
  }, [id, patientId]);

  useEffect(() => {
    return () => {
      dispatch(clearPatientData());
    };
  }, []);

  const getPatientMenuItems = useMemo(() => {
    if (!status && !statusesHistory.length) {
      return [];
    }
    if ((status === PatientStatuses.Walk_In && statusesHistory.length > 1) || status !== PatientStatuses.Walk_In) {
      return patientMenuItems;
    }
    return [patientMenuItems[0]];
  }, [status, statusesHistory]);

  return (
    <MainContentContainer fullHeight={fullHeight} sx={[{ flexDirection: 'column' }, ...convertSxToArray(sx)]}>
      <BackNavigation backButtonTitle={patientName} pathExceptions={patientMenuBackExceptions} />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ height: (theme) => `calc(100% - ${theme.spacing(backNavigationHeight)})` }}
      >
        <SideBar items={getPatientMenuItems} />
        <Box
          sx={(theme) => ({
            overflowY: 'auto',
            flex: { xs: 1, md: 'unset' },
            width: {
              xs: 1,
              md: `calc(100% - ${theme.spacing(27)})`,
            },
          })}
          ref={containerRef}
        >
          {isXs && <ScrollToTopButton containerRef={containerRef} />}
          <Outlet />
        </Box>
      </Stack>
    </MainContentContainer>
  );
};
