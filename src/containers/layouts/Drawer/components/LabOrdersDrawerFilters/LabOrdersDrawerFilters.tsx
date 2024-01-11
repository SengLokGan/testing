import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePickerInput } from '@components/DatePickerInput/DatePickerInput';
import { Select } from '@components/Select/Select';
import { AutocompleteAsync, AutocompleteFreeSoloOptionType, AutocompleteMultiple } from '@components/autocompletes';
import {
  clearLabOrderFilters,
  getFilteredLabOrdersList,
  selectDrawerPayload,
  selectIsAllLabOrdersFiltersValid,
  selectLabOrderFilters,
  selectLabOrdersFiltersErrors,
  selectLabOrdersIsLoading,
  selectPatientName,
  setFilterErrors,
  setFilters,
} from '@store/slices';
import { useAppDispatch } from '@hooks/storeHooks';
import { useProceduresOptionsList, useShiftOptionsList } from '@hooks';
import { validatorIsValidDate } from '@validators';
import { DrawerType, LabOrdersPlace } from '@enums';
import { Dictionaries, getOptionListFromCatalog, getTenantEndCurrentDay, API, checkIsDataValidToPeriod } from '@utils';

const LabOrdersDrawerFilters = () => {
  const [labOptions, setLabOptions] = useState([]);
  const filters = selectLabOrderFilters();
  const errors = selectLabOrdersFiltersErrors();
  const loading = selectLabOrdersIsLoading();
  const isAllValid = selectIsAllLabOrdersFiltersValid();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('labOrders');
  const { t: tCommon } = useTranslation('common');
  const { procedureOptions } = useProceduresOptionsList();
  const { shiftOptions } = useShiftOptionsList();
  const { place } = selectDrawerPayload(DrawerType.LabOrdersFilters);
  const { id } = useParams();
  const patientName = selectPatientName();

  const setFilter = (value, name) => dispatch(setFilters({ [name]: value }));

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
    dispatch(setFilters({ procedures: selectedValue, labIds: [] }));
    getLabList(selectedValue.map((option) => option.value));
  };

  const setDateFilters = (value: Date | null, name: string, dateToCompare?: Date): void => {
    const toDateNames = ['to', 'planTo', 'appointmentTo', 'submissionTo', 'resultTo'];
    const setToDates = () => {
      switch (name) {
        case toDateNames[0]:
          !filters.from && setFilter(value, 'from');
          break;
        case toDateNames[1]:
          !filters.planFrom && setFilter(value, 'planFrom');
          break;
        case toDateNames[2]:
          !filters.appointmentFrom && setFilter(value, 'appointmentFrom');
          break;
        case toDateNames[3]:
          !filters.submissionFrom && setFilter(value, 'submissionFrom');
          break;
        case toDateNames[4]:
          !filters.resultFrom && setFilter(value, 'resultFrom');
          break;
      }
    };
    const error = dateToCompare ? checkIsDataValidToPeriod(value, dateToCompare) : validatorIsValidDate(value);
    const isValid = typeof error !== 'string';
    setFilter(value, name);
    isValid && toDateNames.includes(name) && setToDates();
    dispatch(setFilterErrors({ ...errors, [name]: isValid ? null : error }));
  };

  return (
    <Stack direction="column" spacing={2} sx={{ '& .MuiDivider-root': { mt: 2, mb: 1 } }}>
      <AutocompleteAsync
        value={place === LabOrdersPlace.Header ? filters.patient : { label: patientName, value: id }}
        label={t('forms.creation.patientName')}
        isDisabled={place === LabOrdersPlace.Profile}
        getOptionsUrl={'/pm/patients/names?name='}
        onChange={(value) => setFilter(value, 'patient')}
        optionsTransform={(options) => options.map((option) => ({ id: option.id, label: option.name }))}
        fullWidth
        name="patient"
      />
      <AutocompleteMultiple
        placeholder={t('forms.creation.procedure')}
        options={procedureOptions}
        value={filters.procedures}
        onChange={onChangeProcedure}
        groupBy={(option: AutocompleteFreeSoloOptionType) => option?.group || ''}
        fullWidth
        name="procedures"
      />
      <Typography variant="labelMCapsSB" sx={{ color: ({ palette }) => palette.text.secondary }}>
        {t('filters.performedDate')}
      </Typography>
      <Stack direction="row" spacing={1}>
        <DatePickerInput
          label={t('filters.fromDate')}
          value={filters.from}
          onChange={(value) => setDateFilters(value, 'from')}
          name="from"
          error={errors.from}
          maxDate={filters.to || getTenantEndCurrentDay()}
          fullWidth
        />
        <DatePickerInput
          label={t('filters.toDate')}
          value={filters.to}
          onChange={(value) => setDateFilters(value, 'to', filters.from)}
          name="to"
          error={errors.to}
          fullWidth
          maxDate={getTenantEndCurrentDay()}
        />
      </Stack>
      <AutocompleteMultiple
        placeholder={t('filters.shift')}
        options={shiftOptions}
        value={filters.shifts}
        onChange={(e, value) => setFilter(value, 'shifts')}
        fullWidth
        name="shifts"
      />
      <Divider />
      <AutocompleteAsync
        value={filters.order}
        label={t('filters.labOrder№')}
        getOptionsUrl={'/pm/lab-orders/numbers?search='}
        onChange={(value) => setFilter(value, 'order')}
        optionsTransform={(options) => options.map((option) => ({ id: option.id, label: `${option.number}` }))}
        fullWidth
        name="labOrder"
      />
      <Select
        name="type"
        label={t('filters.orderType')}
        value={filters.type}
        options={getOptionListFromCatalog(Dictionaries.LabOrderTypeFilter)}
        handleChange={(value) => setFilter(value.target.value, 'type')}
        fullWidth
      />
      <Select
        name="labIds"
        multiple
        label={t('forms.creation.labName')}
        options={labOptions}
        value={filters.labIds}
        handleChange={(value) => setFilter(value.target.value, 'labIds')}
        fullWidth
        isDisabled={!filters.procedures.length}
      />
      <Divider />
      <Typography variant="labelMCapsSB" sx={{ color: ({ palette }) => palette.text.secondary }}>
        {t('filters.planeDate')}
      </Typography>
      <Stack direction="row" spacing={1}>
        <DatePickerInput
          label={t('filters.fromDate')}
          value={filters.planFrom}
          onChange={(value) => setDateFilters(value, 'planFrom')}
          name="planFrom"
          error={errors.planFrom}
          maxDate={filters.planTo || getTenantEndCurrentDay()}
          fullWidth
        />
        <DatePickerInput
          label={t('filters.toDate')}
          value={filters.planTo}
          onChange={(value) => setDateFilters(value, 'planTo', filters.planFrom)}
          name="planTo"
          error={errors.planTo}
          maxDate={getTenantEndCurrentDay()}
          fullWidth
        />
      </Stack>
      <Typography variant="labelMCapsSB" sx={{ color: ({ palette }) => palette.text.secondary }}>
        {t('filters.appointmentDate')}
      </Typography>
      <Stack direction="row" spacing={1}>
        <DatePickerInput
          label={t('filters.fromDate')}
          value={filters.appointmentFrom}
          onChange={(value) => setDateFilters(value, 'appointmentFrom')}
          name="appointmentFrom"
          error={errors.appointmentFrom}
          maxDate={filters.appointmentTo || getTenantEndCurrentDay()}
          fullWidth
        />
        <DatePickerInput
          label={t('filters.toDate')}
          value={filters.appointmentTo}
          onChange={(value) => setDateFilters(value, 'appointmentTo', filters.appointmentFrom)}
          name="appointmentTo"
          error={errors.appointmentTo}
          maxDate={getTenantEndCurrentDay()}
          fullWidth
        />
      </Stack>
      <Typography variant="labelMCapsSB" sx={{ color: ({ palette }) => palette.text.secondary }}>
        {t('filters.submissionDate')}
      </Typography>
      <Stack direction="row" spacing={1}>
        <DatePickerInput
          label={t('filters.fromDate')}
          value={filters.submissionFrom}
          onChange={(value) => setDateFilters(value, 'submissionFrom')}
          name="submissionFrom"
          error={errors.submissionFrom}
          maxDate={filters.submissionTo || getTenantEndCurrentDay()}
          fullWidth
        />
        <DatePickerInput
          label={t('filters.toDate')}
          value={filters.submissionTo}
          onChange={(value) => setDateFilters(value, 'submissionTo', filters.submissionFrom)}
          name="submissionTo"
          error={errors.submissionTo}
          maxDate={getTenantEndCurrentDay()}
          fullWidth
        />
      </Stack>
      <Typography variant="labelMCapsSB" sx={{ color: ({ palette }) => palette.text.secondary }}>
        {t('filters.resultDate')}
      </Typography>
      <Stack direction="row" spacing={1} pb={9}>
        <DatePickerInput
          label={t('filters.fromDate')}
          value={filters.resultFrom}
          onChange={(value) => setDateFilters(value, 'resultFrom')}
          name="resultFrom"
          error={errors.resultFrom}
          maxDate={filters.resultTo || getTenantEndCurrentDay()}
          fullWidth
        />
        <DatePickerInput
          label={t('filters.toDate')}
          value={filters.resultTo}
          onChange={(value) => setDateFilters(value, 'resultTo', filters.resultFrom)}
          name="resultTo"
          error={errors.resultTo}
          maxDate={getTenantEndCurrentDay()}
          fullWidth
        />
      </Stack>
      <Box
        sx={(theme) => ({
          py: 1,
          bgcolor: theme.palette.surface.default,
          borderTop: `solid 1px ${theme.palette.border.default}`,
          position: 'absolute',
          bottom: 0,
          width: `calc(100% - ${theme.spacing(4.5)})`,
          zIndex: theme.zIndex.drawer,
        })}
      >
        <Stack spacing={2} direction="row">
          <Button
            onClick={() => dispatch(clearLabOrderFilters())}
            variant={'outlined'}
            data-testid="cancelAddAccessManagementButton"
            sx={{ flexGrow: 1 }}
          >
            {tCommon('button.clearAll')}
          </Button>
          <Button
            onClick={() => dispatch(getFilteredLabOrdersList())}
            variant={'contained'}
            disabled={!isAllValid || loading}
            data-testid="saveAddAccessManagementButton"
            sx={{ flexGrow: 1 }}
          >
            {tCommon('button.show')}
            {loading && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default LabOrdersDrawerFilters;
