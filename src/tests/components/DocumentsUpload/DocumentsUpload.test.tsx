import { render } from '@src/tests';
import { DocumentsUpload } from '@components/DocumentsUpload';
import { FormFile } from '@types';
import userEvent from '@testing-library/user-event';
import { FileTypes } from '@enums';

describe('should render document upload component', () => {
  const mockFile: FormFile = {
    type: FileTypes.IdentityDocument,
    id: '1',
    size: 2499,
    name: 'testFile.pdf',
    tempKey: '123TestFile.pdf',
  };
  const mockFile2: FormFile = {
    type: FileTypes.IdentityDocument,
    id: '2',
    size: 2234,
    name: 'testFile2.pdf',
    tempKey: '123TestFile2.pdf',
  };
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();

  let props;
  beforeEach(() => {
    props = {
      label: 'label',
      onChange,
      onBlur,
      subLabel: 'subLabel',
      maxFileSize: 1024 * 5,
      error: { type: 'maxCount', message: 'maxCount error' },
      name: 'documents',
      value: [mockFile, mockFile2],
      maxFileCount: 5,
    };
  });

  it('should render label', () => {
    const { getByText } = render(<DocumentsUpload {...props} />);

    expect(getByText('label')).toBeTruthy();
    expect(getByText('subLabel')).toBeTruthy();
  });

  it('should render hidden file input', () => {
    const { getByTestId } = render(<DocumentsUpload {...props} />);
    const fileInput = getByTestId('fileInput');

    expect(getByTestId('documentAddButton')).toBeInTheDocument();
    expect(getByTestId('documentAddButton')).toHaveTextContent('button.add');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('hidden', '');
  });

  it('should render two files', () => {
    const { getByText } = render(<DocumentsUpload {...props} />);

    expect(getByText('testFile.pdf')).toBeTruthy();
    expect(getByText('testFile2.pdf')).toBeTruthy();
  });

  it('should render required error message', () => {
    props.error = { type: 'required', message: 'required field' };
    props.value = [];
    const { getByText } = render(<DocumentsUpload {...props} />);

    expect(getByText('required field')).toBeTruthy();
  });

  it('should delete file from list', async () => {
    const { getAllByTestId, queryByText } = render(<DocumentsUpload {...props} />);
    const deleteButtons = getAllByTestId('deleteButton');

    await user.click(deleteButtons[0]);
    expect(queryByText('testFile.pdf')).not.toBeInTheDocument();
  });
});
