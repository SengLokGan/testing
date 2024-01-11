import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  countSessionsBetweenDates,
  dateFormat,
  getHoursAndMinutes,
  joinAndSortFrequencyDays,
  getDoctorName,
  getPersonNameWithDeletedSyfix,
} from '@utils';
import {
  selectDialysisIsolationGroup,
  selectDialysisLoading,
  selectHemodialysisService,
  selectWithDialysis,
} from '@store';
import DialysisServiceCard from '../../DialysisServiceCard';
import { DaysOfWeek } from '@enums';
import { DataRow } from '@components/DataRow/DataRow';

export const DialysisServicesPrescriptionCard = () => {
  const prescription = selectHemodialysisService();
  const isLoading = selectDialysisLoading();
  const { t: tService } = useTranslation('dialysis', { keyPrefix: 'dialysisServices.hemodialysis' });
  const isolationGroup = selectDialysisIsolationGroup();
  const withDialysis = selectWithDialysis();

  if (!withDialysis) {
    return null;
  }

  return (
    <DialysisServiceCard title={tService('activePrescription')}>
      {withDialysis && prescription && !isLoading && (
        <Paper
          sx={({ spacing }) => ({
            padding: spacing(2, 3),
          })}
        >
          <Stack direction="column">
            <Column title={tService('generalInfo')}>
              <DataRow
                title={tService('prescribedBy')}
                value={getDoctorName(prescription.prescribedBy)}
                additionalValue={prescription.prescriptionDate ? dateFormat(prescription.prescriptionDate) : '—'}
              />
              <DataRow
                title={tService('enteredBy')}
                value={getPersonNameWithDeletedSyfix(prescription.enteredBy)}
                additionalValue={
                  prescription.enteredAt ? format(new Date(prescription.enteredAt), 'dd/MM/yyyy hh:mm a') : '—'
                }
              />
              <DataRow title={tService('bloodFlow')} value={prescription.bloodFlow} />
              <DataRow title={tService('dryWeight')} value={prescription.dryWeight} />
            </Column>
            <Column title={tService('dialyzer')}>
              <DataRow
                title={tService('dialyzerUtilization')}
                value={tService(`dialyzerUseTypes.${prescription.dialyzerUseType}`)}
              />
              <DataRow title={tService('dialyzerBrand')} value={prescription.dialyzerBrand} />
              <DataRow title={tService('surfaceArea')} value={prescription.surfaceArea} />
            </Column>
            <Column title={tService('dialysate')}>
              <DataRow title={tService('calcium')} value={prescription.calcium} />
              <DataRow title={tService('sodiumStart')} value={prescription.sodiumStart} />
              <DataRow title={tService('sodiumEnd')} value={prescription.sodiumEnd} />
              <DataRow title={tService('potassium')} value={prescription.potassium} />
              <DataRow title={tService('temperature')} value={prescription.temperature} />
              <DataRow title={tService('flowQd')} value={prescription.flow} />
            </Column>
            <Column title={tService('anticoagulant')}>
              <DataRow title={tService('anticoagulantType')} value={prescription.anticoagulantType} />
              <DataRow title={tService('primeDoseUnits')} value={prescription.primeDose} />
              <DataRow title={tService('bolusDoseUnits')} value={prescription.bolusDose} />
              <DataRow title={tService('hourlyDoseUnits')} value={prescription.hourlyDose} />
            </Column>
            <Column title={tService('scheduling')}>
              {isolationGroup?.name && <DataRow title={tService('isolation')} value={isolationGroup.name} />}
              {prescription.schedule?.recurrent ? (
                <>
                  <DataRow
                    title={tService('frequency')}
                    value={tService(`frequencyCodes.${prescription.schedule.recurrent!.frequency}`)}
                  />
                  <DataRow
                    title={tService('days')}
                    value={`${joinAndSortFrequencyDays(prescription.schedule.recurrent!.daysOfWeek, ', ')} - ${
                      prescription?.schedule.recurrent!.shift.name
                    } ${tService('shift')}`}
                  />
                  <DataRow
                    title={tService('duration')}
                    value={getHoursAndMinutes(prescription?.schedule.recurrent!.duration)}
                  />
                  <DataRow
                    title={tService('startDate')}
                    value={
                      prescription?.schedule.recurrent?.startedAt
                        ? format(new Date(prescription.schedule.recurrent.startedAt), 'dd/MM/yyyy')
                        : ''
                    }
                  />
                  <DataRow
                    title={tService('endDate')}
                    value={
                      prescription?.schedule.recurrent?.endsAt
                        ? format(new Date(prescription.schedule.recurrent.endsAt), 'dd/MM/yyyy')
                        : ''
                    }
                  />
                  <DataRow
                    title={tService('hdSessions')}
                    value={
                      prescription?.schedule.recurrent?.startedAt && prescription?.schedule.recurrent?.endsAt
                        ? countSessionsBetweenDates(
                            prescription.schedule.recurrent.startedAt,
                            prescription.schedule.recurrent.endsAt,
                            prescription.schedule.recurrent!.frequency.daysOfWeek as DaysOfWeek[],
                          )
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  {prescription?.schedule?.adHoc?.dateShifts &&
                    prescription?.schedule?.adHoc.dateShifts.map(({ date, shift, duration }, index) => (
                      <DataRow
                        key={shift.id}
                        title={`${tService('day')} ${index + 1}`}
                        value={`${format(new Date(date), 'dd/MM/yyyy')} - ${shift.name} ${tService(
                          'shift',
                        )} (${getHoursAndMinutes(Number(duration))})`}
                      />
                    ))}
                </>
              )}
            </Column>
            <Column title={tService('comments')}>
              <Typography variant="labelM" sx={{ mt: `0 !important`, mb: (theme) => `${theme.spacing(2)} !important` }}>
                {prescription.comments ?? '—'}
              </Typography>
            </Column>
          </Stack>
        </Paper>
      )}
    </DialysisServiceCard>
  );
};

const Column = ({
  title,
  children,
}: PropsWithChildren<{
  title: string;
}>) => {
  return (
    <Stack spacing={2}>
      <Typography variant="labelL" sx={{ mb: 0 }}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};
