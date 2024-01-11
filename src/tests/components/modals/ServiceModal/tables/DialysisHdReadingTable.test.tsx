import { render } from '@src/tests/utils';
import DialysisHdReadingTable from '../../../../../components/modals/ServiceModal/components/DialysisProcedureModal/components/tables/DialysisHdReadingTable';
import { dialysisFixture, dialysisHdReadingRecordFixture } from '@src/tests/fixtures/dialysis';
import { DialysisStatus } from '@enums';
import { format } from 'date-fns';

describe('DialysisHdReadingTable', () => {
  it("should check that the component isn't being rendered", () => {
    const { container } = render(<DialysisHdReadingTable />, {
      preloadedState: {
        dialysis: {
          status: {
            activeStep: DialysisStatus.CheckIn,
            currentStep: DialysisStatus.CheckIn,
          },
          loading: false,
          hdReading: {
            storage: null,
            allRecords: [],
            savedRecords: [],
          },
        },
      },
    });

    expect(container.querySelectorAll('div').length).toEqual(0);
  });

  it('should check that the component is being rendered and offline rows are highlighted', () => {
    const hdRecord = dialysisHdReadingRecordFixture({ id: 1, __STATUS__: true } as any);
    const { getByText, getByTestId } = render(<DialysisHdReadingTable />, {
      preloadedState: dialysisFixture(DialysisStatus.HDReading, [hdRecord]),
    });

    expect(getByText(format(new Date(hdRecord.time), 'hh:mm a'))).toBeTruthy();
    expect(getByText(hdRecord.systolicBp)).toBeTruthy();
    expect(getByText(hdRecord.diastolicBp)).toBeTruthy();
    expect(getByText(hdRecord.hr)).toBeTruthy();
    expect(getByText(hdRecord.ap)).toBeTruthy();
    expect(getByText(hdRecord.vp)).toBeTruthy();
    expect(getByText(hdRecord.tmp)).toBeTruthy();
    expect(getByText(hdRecord.ufRate)).toBeTruthy();
    expect(getByText(hdRecord.qb)).toBeTruthy();
    expect(getByText(hdRecord.qd)).toBeTruthy();
    expect(getByText(hdRecord.cumUf)).toBeTruthy();
    expect(getByText(hdRecord.totalUf)).toBeTruthy();
    expect(getByText(hdRecord.conductivity)).toBeTruthy();
    expect(getByText(hdRecord.heparinRate)).toBeTruthy();
    expect(getByText(hdRecord.ktV)).toBeTruthy();
    expect(getByText(hdRecord.urr)).toBeTruthy();
    expect(getByText(hdRecord.duringHdNotes)).toBeTruthy();
    expect(getByText(hdRecord.signedBy)).toBeTruthy();
    expect(getByTestId('richTableOfflineRow')).toBeTruthy();
  });
});
