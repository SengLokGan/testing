import { render } from '@src/tests';
import { DialysisHdReadingStepForm } from '@components/modals/ServiceModal/components/DialysisProcedureModal/components/steps/components/DialysisHdReadingStepForm';
import userEvent from '@testing-library/user-event';
import { HdReadingDataRequest, HdReadingForm } from '@types';
import { server } from '@src/tests/server/serverMock';
import { rest } from 'msw';
import { screen } from '@testing-library/dom';

const commonPartOfFieldId = 'TextInput';

const fieldsId = {
  signedBy: 'signedByFormAutocomplete',
  duringHdNotes: `duringHdNotes${commonPartOfFieldId}`,
  cumHeparin: `cumHeparin${commonPartOfFieldId}`,
  ktV: `ktV${commonPartOfFieldId}`,
  cumUf: `cumUf${commonPartOfFieldId}`,
  dialysateTemp: `dialysateTemp${commonPartOfFieldId}`,
  totalUf: `totalUf${commonPartOfFieldId}`,
  ufRate: `ufRate${commonPartOfFieldId}`,
  heparinRate: `heparinRate${commonPartOfFieldId}`,
  conductivity: `conductivity${commonPartOfFieldId}`,
  systolicBp: `systolicBp${commonPartOfFieldId}`,
  diastolicBp: `diastolicBp${commonPartOfFieldId}`,
  hr: `hr${commonPartOfFieldId}`,
  tmp: `tmp${commonPartOfFieldId}`,
  urr: `urr${commonPartOfFieldId}`,
  vp: `vp${commonPartOfFieldId}`,
  qb: `qb${commonPartOfFieldId}`,
  qd: `qd${commonPartOfFieldId}`,
  ap: `ap${commonPartOfFieldId}`,
};

const fieldsWithTransformProp = [
  'tmp',
  'ufRate',
  'heparinRate',
  'cumHeparin',
  'cumUf',
  'totalUf',
  'conductivity',
  'dialysateTemp',
  'ktV',
];

const defaultValues: Omit<HdReadingForm, 'time'> = {
  ap: '',
  conductivity: undefined,
  cumUf: undefined,
  cumHeparin: undefined,
  heparinRate: undefined,
  dialysateTemp: undefined,
  ktV: undefined,
  duringHdNotes: '',
  hr: '',
  tmp: undefined,
  totalUf: undefined,
  signedBy: { label: 'Nurse 1', value: '1' },
  qb: undefined,
  ufRate: undefined,
  urr: undefined,
  vp: undefined,
  qd: undefined,
  systolicBp: undefined,
  diastolicBp: undefined,
};

let fieldsData: Omit<Required<HdReadingDataRequest>, 'time'> = {
  signedBy: 'Nurse 1',
  signedById: '1',
  duringHdNotes: 'test notes, with replaced new lines',
  cumHeparin: 100,
  ktV: 120,
  cumUf: 110,
  dialysateTemp: 37.2,
  totalUf: 500,
  ufRate: 900,
  heparinRate: 700,
  conductivity: 150,
  systolicBp: 60,
  diastolicBp: 90,
  hr: '800',
  tmp: 600,
  urr: 100,
  vp: 170,
  qb: 200,
  qd: 200,
  ap: '100',
};

const nurses = [
  { id: '1', name: 'Nurse 1', userId: 'user1' },
  { id: '2', name: 'Nurse 2', userId: 'user2' },
];
server.use(
  rest.get(`${process.env.DEVELOPMENT_API_TARGET}/pm/nurses`, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json(nurses));
  }),
);

describe('DialysisHdReadingStepForm', () => {
  const user = userEvent.setup();

  it('should submit form with correct data', async () => {
    const onSubmit = jest.fn();
    render(<DialysisHdReadingStepForm onSubmit={onSubmit} />, {
      preloadedState: { user: { user: { id: '1' } } },
    });

    await user.type(screen.getByTestId(fieldsId.duringHdNotes), fieldsData.duringHdNotes);
    await user.type(screen.getByTestId(fieldsId.cumHeparin), fieldsData.cumHeparin.toString());
    await user.type(screen.getByTestId(fieldsId.ktV), fieldsData.ktV.toString());
    await user.type(screen.getByTestId(fieldsId.cumUf), fieldsData.cumUf.toString());
    await user.type(screen.getByTestId(fieldsId.dialysateTemp), fieldsData.dialysateTemp.toString());
    await user.type(screen.getByTestId(fieldsId.totalUf), fieldsData.totalUf.toString());
    await user.type(screen.getByTestId(fieldsId.ufRate), fieldsData.ufRate.toString());
    await user.type(screen.getByTestId(fieldsId.heparinRate), fieldsData.heparinRate.toString());
    await user.type(screen.getByTestId(fieldsId.conductivity), fieldsData.conductivity.toString());
    await user.type(screen.getByTestId(fieldsId.systolicBp), fieldsData.systolicBp.toString());
    await user.type(screen.getByTestId(fieldsId.diastolicBp), fieldsData.diastolicBp.toString());
    await user.type(screen.getByTestId(fieldsId.hr), fieldsData.hr);
    await user.type(screen.getByTestId(fieldsId.tmp), fieldsData.tmp.toString());
    await user.type(screen.getByTestId(fieldsId.urr), fieldsData.urr.toString());
    await user.type(screen.getByTestId(fieldsId.vp), fieldsData.vp.toString());
    await user.type(screen.getByTestId(fieldsId.qb), fieldsData.qb.toString());
    await user.type(screen.getByTestId(fieldsId.qd), fieldsData.qd.toString());
    await user.type(screen.getByTestId(fieldsId.ap), fieldsData.ap);

    await user.click(screen.getByTestId('saveHdReadingFormButton'));

    expect(onSubmit).toBeCalled();
    const enteredData = onSubmit.mock.lastCall[0];
    delete enteredData.time;
    expect(onSubmit).toBeCalledWith(fieldsData);
  });

  it('should clear fields values, when click on "Clear" button', async () => {
    render(<DialysisHdReadingStepForm onSubmit={() => {}} />, {
      preloadedState: { user: { user: { id: '1' } } },
    });

    await user.type(screen.getByTestId(fieldsId.duringHdNotes), fieldsData.duringHdNotes);
    await user.type(screen.getByTestId(fieldsId.cumHeparin), fieldsData.cumHeparin.toString());
    await user.type(screen.getByTestId(fieldsId.ktV), fieldsData.ktV.toString());
    await user.type(screen.getByTestId(fieldsId.cumUf), fieldsData.cumUf.toString());
    await user.type(screen.getByTestId(fieldsId.dialysateTemp), fieldsData.dialysateTemp.toString());
    await user.type(screen.getByTestId(fieldsId.totalUf), fieldsData.totalUf.toString());
    await user.type(screen.getByTestId(fieldsId.ufRate), fieldsData.ufRate.toString());
    await user.type(screen.getByTestId(fieldsId.heparinRate), fieldsData.heparinRate.toString());
    await user.type(screen.getByTestId(fieldsId.conductivity), fieldsData.conductivity.toString());
    await user.type(screen.getByTestId(fieldsId.systolicBp), fieldsData.systolicBp.toString());
    await user.type(screen.getByTestId(fieldsId.diastolicBp), fieldsData.diastolicBp.toString());
    await user.type(screen.getByTestId(fieldsId.hr), fieldsData.hr);
    await user.type(screen.getByTestId(fieldsId.tmp), fieldsData.tmp.toString());
    await user.type(screen.getByTestId(fieldsId.urr), fieldsData.urr.toString());
    await user.type(screen.getByTestId(fieldsId.vp), fieldsData.vp.toString());
    await user.type(screen.getByTestId(fieldsId.qb), fieldsData.qb.toString());
    await user.type(screen.getByTestId(fieldsId.qd), fieldsData.qd.toString());
    await user.type(screen.getByTestId(fieldsId.ap), fieldsData.ap);

    await user.click(screen.getByTestId('clearHdReadingFormButton'));

    expect(screen.getByTestId(fieldsId.signedBy)).toHaveAttribute('value', '');
    expect(screen.queryByText(fieldsData.duringHdNotes)).toBeFalsy();
    expect(screen.getByTestId(fieldsId.ktV)).toHaveAttribute('value', defaultValues.ktV);
    expect(screen.getByTestId(fieldsId.cumUf)).toHaveAttribute('value', defaultValues.cumUf);
    expect(screen.getByTestId(fieldsId.dialysateTemp)).toHaveAttribute('value', defaultValues.dialysateTemp);
    expect(screen.getByTestId(fieldsId.totalUf)).toHaveAttribute('value', defaultValues.totalUf);
    expect(screen.getByTestId(fieldsId.ufRate)).toHaveAttribute('value', defaultValues.ufRate);
    expect(screen.getByTestId(fieldsId.heparinRate)).toHaveAttribute('value', defaultValues.heparinRate);
    expect(screen.getByTestId(fieldsId.conductivity)).toHaveAttribute('value', defaultValues.conductivity);
    expect(screen.getByTestId(fieldsId.systolicBp)).toHaveAttribute('value', defaultValues.systolicBp);
    expect(screen.getByTestId(fieldsId.diastolicBp)).toHaveAttribute('value', defaultValues.diastolicBp);
    expect(screen.getByTestId(fieldsId.hr)).toHaveAttribute('value', defaultValues.hr);
    expect(screen.getByTestId(fieldsId.tmp)).toHaveAttribute('value', defaultValues.tmp);
    expect(screen.getByTestId(fieldsId.urr)).toHaveAttribute('value', defaultValues.urr);
    expect(screen.getByTestId(fieldsId.vp)).toHaveAttribute('value', defaultValues.vp);
    expect(screen.getByTestId(fieldsId.qb)).toHaveAttribute('value', defaultValues.qb);
    expect(screen.getByTestId(fieldsId.qd)).toHaveAttribute('value', defaultValues.qd);
    expect(screen.getByTestId(fieldsId.ap)).toHaveAttribute('value', defaultValues.ap);
  });

  const checkFieldsWithTransformProp = (fieldId: string) => {
    it(`should transform comma into dot in field with id = ${fieldId}`, async () => {
      render(<DialysisHdReadingStepForm onSubmit={() => {}} />);
      await user.type(screen.getByTestId(`${fieldId}${commonPartOfFieldId}`), '1,5');

      expect(screen.getByTestId(`${fieldId}${commonPartOfFieldId}`)).toHaveAttribute('value', '1.5');
    });
  };

  fieldsWithTransformProp.forEach((fieldId) => {
    checkFieldsWithTransformProp(fieldId);
  });
});
