import { downloadFile } from '@src/utils/downloadFile';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';

describe('downloadFile', () => {
  const blobData = new Blob(['test data'], { type: 'text/plain' });
  const fileName = 'test.txt';

  it('should create and download a file', () => {
    window.URL.createObjectURL = jest.fn();
    const linkClickSpy = jest.spyOn(window.HTMLAnchorElement.prototype, 'click');

    downloadFile(blobData, fileName, 'text/plain');

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(blobData);
    expect(linkClickSpy).toHaveBeenCalled();
  });

  it('should not set download attribute if fileType is pdf', () => {
    render(<a data-testid="file-link" href="#" />);
    const linkClickSpy = jest.spyOn(screen.getByTestId('file-link'), 'click');

    downloadFile(blobData, fileName, 'application/pdf');

    expect(linkClickSpy).toHaveBeenCalled();
    expect(screen.getByTestId('file-link')).not.toHaveAttribute('download');
  });
});
