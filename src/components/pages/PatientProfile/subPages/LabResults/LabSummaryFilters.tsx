import Stack from '@mui/material/Stack';
import { AutocompleteFreeSoloOptionType, AutocompleteMultiple, DatePickerInput } from '@components';
import { Select } from '@components/Select/Select';
import { useTranslation } from 'react-i18next';
import {
  selectLabResultsFilters,
  selectLabResultsFiltersError,
  setLabResultsFilter,
  setLabResultsFilterError,
  clearLabResultsFilters,
  exportLabResults,
} from '@store';
import { useState } from 'react';
import { useAppDispatch, useProceduresOptionsList } from '@hooks';
import { API, checkIsDataValidToPeriod, getTenantEndCurrentDay } from '@utils';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { format, isValid } from 'date-fns';
import { UserPermissions } from '@enums/store';
import { PermissionGuard } from '@guards/PermissionGuard';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useParams } from 'react-router-dom';

type LabSummaryFiltersProps = {
  dataLength: number;
};
export const LabSummaryFilters = ({ dataLength }: LabSummaryFiltersProps) => {
  const { t } = useTranslation('labOrders');
  const { t: tCommon } = useTranslation('common');
  const { id: patientId } = useParams();
  const filters = selectLabResultsFilters();
  const errors = selectLabResultsFiltersError();
  const dispatch = useAppDispatch();
  const { procedureOptions } = useProceduresOptionsList();
  const [labOptions, setLabOptions] = useState([]);
  const setFilter = (value, name) => dispatch(setLabResultsFilter({ [name]: value }));

  const isClearFiltersDisabled =
    isValid(filters.to) &&
    format(filters.to, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') &&
    isValid(filters.from) &&
    format(filters.from, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') &&
    !filters.labName.length &&
    !filters.procedure.length;

  const setFilterFrom = (value) => {
    const errorFrom = checkIsDataValidToPeriod(value, new Date('2022-11-11'));
    const errorTo = checkIsDataValidToPeriod(filters.to, value);
    dispatch(setLabResultsFilterError({ from: errorFrom, to: errorTo }));
    setFilter(value, 'from');
  };

  const setFilterTo = (value) => {
    const errorFrom = checkIsDataValidToPeriod(filters.from, new Date('2022-11-11'));
    const errorTo = checkIsDataValidToPeriod(value, filters.from);
    dispatch(setLabResultsFilterError({ from: errorFrom, to: errorTo }));
    setFilter(value, 'to');
  };

  const getLabList = async (procedureIds: string[]) => {
    API.get('/pm/labs', {
      params: { procedureIds: procedureIds.join(',') },
    })
      .then(({ data }) => {
        setLabOptions(data.map((option) => ({ label: option.name, value: option.id })));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChangeProcedure = (e, selectedValue) => {
    dispatch(setLabResultsFilter({ procedure: selectedValue, labName: [] }));
    getLabList(selectedValue.map((option) => option.value));
  };

  const clearFiltersHandler = () => dispatch(clearLabResultsFilters());

  const exportLabResultsHandler = () => patientId && dispatch(exportLabResults(patientId));

  return (
    <>
      <Stack direction="row" spacing={2}>
        <DatePickerInput
          label={t('filters.fromDate')}
          value={filters.from}
          onChange={setFilterFrom}
          name="from"
          error={errors.from}
          maxDate={getTenantEndCurrentDay()}
          fullWidth
        />
        <DatePickerInput
          label={t('filters.toDate')}
          value={filters.to}
          onChange={setFilterTo}
          name="to"
          error={errors.to}
          maxDate={getTenantEndCurrentDay()}
          fullWidth
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <AutocompleteMultiple
          placeholder={t('forms.creation.procedure')}
          options={procedureOptions}
          value={filters.procedure}
          onChange={onChangeProcedure}
          groupBy={(option: AutocompleteFreeSoloOptionType) => option?.group || ''}
          fullWidth
          name="procedures"
        />
        <Select
          name="labName"
          multiple
          label={t('forms.creation.labName')}
          options={labOptions}
          value={filters.labName}
          handleChange={(value) => setFilter(value.target.value, 'labName')}
          fullWidth
          isDisabled={!filters.procedure.length}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={clearFiltersHandler}
          disabled={isClearFiltersDisabled}
          variant="outlined"
          data-testid="clearFiltersButton"
        >
          <Typography variant="labelL" sx={{ textTransform: 'none' }}>
            {t('filters.clearFilters')}
          </Typography>
        </Button>
        <PermissionGuard permissions={UserPermissions.AnalysesPrintResult}>
          <Button
            onClick={exportLabResultsHandler}
            disabled={!dataLength}
            variant="outlined"
            data-testid="exportButton"
          >
            <Stack direction="row" spacing={1}>
              <Typography variant="labelL" sx={{ textTransform: 'none' }}>
                {tCommon('button.export')}
              </Typography>
              <SaveOutlinedIcon
                sx={({ palette }) => ({ color: !dataLength ? palette.action.disabled : palette.primary.main })}
              />
            </Stack>
          </Button>
        </PermissionGuard>
      </Stack>
    </>
  );
};
