import { screen } from '@testing-library/dom';
import { render } from '@src/tests';
import { ClinicalNoteCardListItemTitle } from '@components/pages/PatientProfile/subPages/ClinicalNotes/ClinicalNoteCard/ClinicalNoteCardListItemTitle';

describe('ClinicalNoteCardListItemTitle', () => {
  it('should render text', () => {
    render(<ClinicalNoteCardListItemTitle text="Test text" />);

    expect(screen.getByText('Test text')).toBeInTheDocument();
  });
});
