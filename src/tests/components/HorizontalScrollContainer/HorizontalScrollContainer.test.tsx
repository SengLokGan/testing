import { HorizontalScrollContainer } from '@components';
import { render } from '@src/tests';

describe('HorizontalScrollContainer', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <HorizontalScrollContainer>
        <div>Child 1</div>
        <div>Child 2</div>
      </HorizontalScrollContainer>,
    );
    const component = getByTestId('horizontalScrollContainer');
    expect(component).toBeInTheDocument();
    expect(component.childNodes.length).toBe(2);
  });

  it('renders with nowrap when nowrap prop is true', () => {
    const { getByTestId } = render(
      <HorizontalScrollContainer nowrap>
        <div>Child 1</div>
        <div>Child 2</div>
      </HorizontalScrollContainer>,
    );
    const component = getByTestId('horizontalScrollContainer');
    expect(component).toHaveStyle('white-space: nowrap');
    expect(component).toHaveStyle('display: flex');
    expect(component).toHaveStyle('overflowY: hidden');
    expect(component).toHaveStyle('overflowX: auto');
  });
});
