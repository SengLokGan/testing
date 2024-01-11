import { render } from '../../../../utils';
import DialysisServiceCard from '../../../../../components/modals/ServiceModal/components/DialysisProcedureModal/components/DialysisServiceCard';

describe('DialysisServiceCard', () => {
  const title = 'TestTitle';
  const children = 'Test children';

  it('should check that the component is being rendered', () => {
    const { queryByText } = render(
      <DialysisServiceCard title={title}>
        <p>{children}</p>
      </DialysisServiceCard>,
    );
    expect(queryByText(title)).toBeTruthy();
    expect(queryByText(children)).toBeTruthy();
  });
});
