import { render } from '@src/tests';
import { DialysisProgressInfoBlockVariants, DialysisStatus } from '@enums';
import { DialysisProgressInfoBlock } from '@components/DialysisProgressInfoBlock/DialysisProgressInfoBlock';
import { StandardDialysisInfoBlock } from '@components/DialysisProgressInfoBlock/components/StandardDialysisInfoBlock';
import { TableVariantDialysisInfoBlock } from '@components/DialysisProgressInfoBlock/components/TableVariantDialysisInfoBlock';
import { format, subHours, addHours } from 'date-fns';

describe('DialysisProgressInfoBlock', () => {
  const checkDialysisProgressInfoBlockVariants = (
    expectedComponentName: string,
    notExpectedComponentName: string,
    variant: DialysisProgressInfoBlockVariants,
  ) => {
    it(`should render ${expectedComponentName}, when prop "variant" equals ${variant}`, () => {
      const { getByTestId, queryByTestId } = render(
        <DialysisProgressInfoBlock variant={variant} dialysisProcessInfo={{ status: DialysisStatus.CheckIn }} />,
      );

      expect(getByTestId(expectedComponentName)).toBeInTheDocument();
      expect(queryByTestId(notExpectedComponentName)).not.toBeInTheDocument();
    });
  };

  checkDialysisProgressInfoBlockVariants(
    'StandardDialysisInfoBlock',
    'TableVariantDialysisInfoBlock',
    DialysisProgressInfoBlockVariants.Standard,
  );
  checkDialysisProgressInfoBlockVariants(
    'TableVariantDialysisInfoBlock',
    'StandardDialysisInfoBlock',
    DialysisProgressInfoBlockVariants.Table,
  );

  it('should render correct progress percentages and label due to startTime and endTime', () => {
    const startTime = subHours(new Date(), 1).toISOString();
    const endTime = addHours(new Date(), 1).toISOString();

    const { getByTestId, getByText } = render(
      <DialysisProgressInfoBlock
        variant={DialysisProgressInfoBlockVariants.Standard}
        dialysisProcessInfo={{ status: DialysisStatus.HDReading, startTime, endTime }}
      />,
    );

    expect(getByTestId('BaseProgressBarLine')).toHaveStyle('width: 50%');
    expect(getByText('- 00h 59m')).toBeTruthy();
  });

  describe('StandardDialysisInfoBlock', () => {
    const checkRenderDueToStatus = (
      expectedComponentName: string,
      notExpectedComponentName: string,
      status: DialysisStatus,
    ) => {
      it(`it should render ${expectedComponentName}, when dialysis status equals ${status}`, () => {
        const { getByTestId, queryByTestId } = render(
          <StandardDialysisInfoBlock dialysisProcessInfo={{ status }} progressInPercents={0} progressLabel="" />,
        );

        expect(getByTestId(expectedComponentName)).toBeInTheDocument();
        expect(queryByTestId(notExpectedComponentName)).not.toBeInTheDocument();
      });
    };

    checkRenderDueToStatus(
      'StandardDialysisInfoBlockVariantCHECK_IN',
      'StandardDialysisInfoBlockVariantPRE_DIALYSIS',
      DialysisStatus.CheckIn,
    );
    checkRenderDueToStatus(
      'StandardDialysisInfoBlockVariantPRE_DIALYSIS',
      'StandardDialysisInfoBlockVariantCHECK_IN',
      DialysisStatus.PreDialysis,
    );
    checkRenderDueToStatus(
      'StandardDialysisInfoBlockVariantWithProgress',
      'StandardDialysisInfoBlockVariantWithButton',
      DialysisStatus.HDReading,
    );
    checkRenderDueToStatus(
      'StandardDialysisInfoBlockVariantWithProgress',
      'StandardDialysisInfoBlockVariantWithButton',
      DialysisStatus.PostDialysis,
    );

    const checkTitleDueToStatus = (status: DialysisStatus, expectedTitle: string) => {
      it(`should render correct title, when status equals to ${status}`, () => {
        const { getByText } = render(
          <StandardDialysisInfoBlock dialysisProcessInfo={{ status }} progressInPercents={0} progressLabel="" />,
        );

        expect(getByText(expectedTitle)).toBeTruthy();
      });
    };

    checkTitleDueToStatus(DialysisStatus.HDReading, 'progress.dialysisInProgress');
    checkTitleDueToStatus(DialysisStatus.PostDialysis, 'progress.dialysisIsFinished');

    it('should render correctly due to props', () => {
      const startTime = '2022-11-01T09:15:00.580Z';
      const endTime = '2022-11-01T14:05:00.580Z';
      const { getByText } = render(
        <StandardDialysisInfoBlock
          dialysisProcessInfo={{
            status: DialysisStatus.HDReading,
            startTime,
            endTime,
            bay: 'Test Bay',
          }}
          progressInPercents={0}
          progressLabel=""
        />,
      );

      expect(getByText('Test Bay')).toBeTruthy();
      expect(
        getByText(`${format(new Date(startTime), 'hh:mm a')} - ${format(new Date(endTime), 'hh:mm a')}`),
      ).toBeTruthy();
    });
  });

  describe('TableVariantDialysisInfoBlock', () => {
    const checkRenderDueToStatus = (
      expectedComponentName: string,
      notExpectedComponentsName: string[],
      status: DialysisStatus,
    ) => {
      it(`it should render ${expectedComponentName}, when dialysis status equals ${status}`, () => {
        const { getByTestId, queryByTestId } = render(
          <TableVariantDialysisInfoBlock dialysisProcessInfo={{ status }} progressInPercents={0} progressLabel="" />,
        );

        expect(getByTestId(expectedComponentName)).toBeInTheDocument();
        notExpectedComponentsName.forEach((name) => {
          expect(queryByTestId(name)).not.toBeInTheDocument();
        });
      });
    };

    checkRenderDueToStatus(
      'TableVariantDialysisInfoBlockCHECK_IN',
      ['TableVariantDialysisInfoBlockWithProgress', 'TableVariantDialysisInfoBlockWithProgress'],
      DialysisStatus.CheckIn,
    );
    checkRenderDueToStatus(
      'TableVariantDialysisInfoBlockPRE_DIALYSIS',
      ['TableVariantDialysisInfoBlockWithProgress', 'TableVariantDialysisInfoBlockWithProgress'],
      DialysisStatus.PreDialysis,
    );
    checkRenderDueToStatus(
      'TableVariantDialysisInfoBlockHD_READING',
      ['TableVariantDialysisInfoBlockWithButtons', 'TableVariantDialysisInfoBlockWithIconsStatuses'],
      DialysisStatus.HDReading,
    );
    checkRenderDueToStatus(
      'TableVariantDialysisInfoBlockPOST_DIALYSIS',
      ['TableVariantDialysisInfoBlockWithButtons', 'TableVariantDialysisInfoBlockWithIconsStatuses'],
      DialysisStatus.PostDialysis,
    );
    checkRenderDueToStatus(
      'TableVariantDialysisInfoBlockCOMPLETED',
      ['TableVariantDialysisInfoBlockWithButtons', 'TableVariantDialysisInfoBlockWithProgress'],
      DialysisStatus.Completed,
    );

    const checkIconsAndLabelsDueToStatus = (
      status: DialysisStatus,
      expectedIconId: string,
      notExpectedIconId: string,
      label: string,
    ) => {
      it('should render correct icon and label due to status', () => {
        const { getByTestId, getByText, queryByTestId } = render(
          <TableVariantDialysisInfoBlock dialysisProcessInfo={{ status }} progressInPercents={0} progressLabel="" />,
        );

        expect(getByTestId(expectedIconId)).toBeInTheDocument();
        expect(queryByTestId(notExpectedIconId)).not.toBeInTheDocument();
        expect(getByText(label)).toBeTruthy();
      });
    };

    checkIconsAndLabelsDueToStatus(
      DialysisStatus.Completed,
      'completedDialysisIcon',
      'canceledDialysisIcon',
      'progress.completed',
    );
    checkIconsAndLabelsDueToStatus(
      DialysisStatus.Cancelled,
      'canceledDialysisIcon',
      'completedDialysisIcon',
      'progress.canceled',
    );
  });
});
