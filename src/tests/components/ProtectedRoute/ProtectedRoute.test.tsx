import { render } from '../../utils';
import { ProtectedRoute } from '@components';
import React from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}));

describe('ProtectedRoute', () => {
  it('should render the allowed path', () => {
    const { queryByTestId } = render(
      <>
        <ProtectedRoute isAllowed>
          <div data-testid="test" />
        </ProtectedRoute>
      </>,
    );
    expect(queryByTestId('test')).toBeInTheDocument();
  });
});
