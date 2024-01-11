import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { DialysisProgressInfoBlock, StyledPatientRowStack, VirologyChip } from '@components';
import { useTranslation } from 'react-i18next';
import { AppointmentTableItem, DialysisProcessInfoForProgress } from '@types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants';
import Box from '@mui/material/Box';
import { DialysisProgressInfoBlockVariants, ServiceModalName } from '@enums/components';
import { format } from 'date-fns';
import RichTableCellSpecialNotes from '@components/RichTable/components/components/RichTableCellSpecialNotes';
import { addServiceModal } from '@store/slices';
import { useAppDispatch } from '@hooks/storeHooks';

type TodayPatientCardProps = {
  patient: AppointmentTableItem;
};

export const TodayPatientCard = ({
  patient: { name, isolation, status, startTime, hdProgress, endTime, bay, tags },
}: TodayPatientCardProps) => {
  const { t } = useTranslation('todayPatients');
  const dispatch = useAppDispatch();
  const dataForProgressInfoBlock: DialysisProcessInfoForProgress = {
    status,
    startTime,
    endTime,
  };

  const formattedStartTime = startTime ? format(new Date(startTime), 'hh:mm a') : null;
  const formattedEndTime = endTime ? format(new Date(endTime), 'hh:mm a') : null;

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Stack direction="column" spacing={1.5}>
        <Box
          component={Link}
          sx={{ display: 'flex', alignItems: 'center' }}
          color="primary.main"
          to={`/${ROUTES.patientsOverview}/${name.id}/${ROUTES.patientProfile}`}
        >
          <Avatar
            sx={(theme) => ({ mr: 1, width: theme.spacing(4), height: theme.spacing(4) })}
            src={name?.photoPath ? name.photoPath : ''}
          >
            {name.name[0]}
          </Avatar>
          <Typography
            variant="labelL"
            color="primary"
            sx={{
              textOverflow: 'ellipsis',
              display: 'block',
              overflow: 'hidden',
            }}
          >
            {name.name}
          </Typography>
        </Box>
        <Stack direction="column">
          <StyledPatientRowStack direction="row" spacing={2} width={12} height={3.5}>
            <Typography variant="labelM">{t('tableView.status')}</Typography>
            {dataForProgressInfoBlock?.status && (
              <DialysisProgressInfoBlock
                variant={DialysisProgressInfoBlockVariants.Table}
                dialysisProcessInfo={dataForProgressInfoBlock}
                checkInfoHandler={() =>
                  dispatch(
                    addServiceModal({
                      name: ServiceModalName.DialysisProcedureModal,
                      payload: {
                        patientId: hdProgress.patientId,
                        appointmentId: hdProgress.appointmentId,
                      },
                    }),
                  )
                }
                sx={{ width: 1 }}
              />
            )}
            {!dataForProgressInfoBlock?.status && <Typography variant="labelM">—</Typography>}
          </StyledPatientRowStack>
          <StyledPatientRowStack direction="row" spacing={2} width={12} height={3.5}>
            <Typography variant="labelM">{t('tableView.bay')}</Typography>
            <Typography variant="labelM">{bay ? bay : t('tableView.na')}</Typography>
          </StyledPatientRowStack>
          <StyledPatientRowStack direction="row" spacing={2} width={12} height={3.5}>
            <Typography variant="labelM">{t('tableView.time')}</Typography>
            <Typography variant="labelM">
              {startTime && endTime ? `${formattedStartTime} - ${formattedEndTime}` : t('tableView.na')}
            </Typography>
          </StyledPatientRowStack>
          <StyledPatientRowStack direction="row" spacing={2} width={12} height={3.5}>
            <Typography variant="labelM" sx={{ flexShrink: 0, pt: isolation.length > 0 ? 0.5 : 0 }}>
              {t('tableView.isolator')}
            </Typography>
            {isolation && isolation.length > 0 ? (
              <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap' }}>
                {isolation.map((virus) => (
                  <VirologyChip key={virus} name={virus} />
                ))}
              </Stack>
            ) : (
              <Typography variant="labelM">—</Typography>
            )}
          </StyledPatientRowStack>
          <StyledPatientRowStack direction="row" spacing={2} width={12} height={3.5}>
            <Typography variant="labelM">{t('tableView.specialNotes')}</Typography>
            <RichTableCellSpecialNotes specialNotes={tags} />
          </StyledPatientRowStack>
        </Stack>
      </Stack>
    </Paper>
  );
};
