import { screen } from '@testing-library/dom';
import { render } from '../../../../../../utils';
import { ClinicalNoteCard } from '../../../../../../../components/pages/PatientProfile/subPages/ClinicalNotes/ClinicalNoteCard/ClinicalNoteCard';
import { clinicalNoteFixture } from '@src/tests/fixtures';

describe('ClinicalNoteCard', () => {
  it('should correctly render type and details, when there are no details', () => {
    render(<ClinicalNoteCard data={clinicalNoteFixture} />);

    expect(screen.getByText(`filters.noteTypes.${clinicalNoteFixture.type}`)).toBeInTheDocument();
    expect(screen.queryByText(`filters.noteTypes.${clinicalNoteFixture.type} — `)).not.toBeInTheDocument();
  });

  it('should correctly render type and details, when there are details data', () => {
    render(<ClinicalNoteCard data={{ ...clinicalNoteFixture, details: 'Test details' }} />);

    expect(screen.getByText(`filters.noteTypes.${clinicalNoteFixture.type} — Test details`)).toBeInTheDocument();
  });

  it('should render only "enteredBy", if there is no editedBy', () => {
    render(<ClinicalNoteCard data={clinicalNoteFixture} />);

    expect(screen.getByText(clinicalNoteFixture.enteredBy.name)).toBeInTheDocument();
    expect(screen.queryByText(`${clinicalNoteFixture.editedBy?.name}`)).not.toBeInTheDocument();
  });

  it('should render both "enteredBy" and "editedBy"', () => {
    render(
      <ClinicalNoteCard
        data={{ ...clinicalNoteFixture, editedBy: { id: 3, name: 'Edited By Name', deleted: false } }}
      />,
    );

    expect(screen.getByText('Edited By Name')).toBeInTheDocument();
    expect(screen.getByText(clinicalNoteFixture.enteredBy.name)).toBeInTheDocument();
  });

  it('should render "note"', () => {
    render(<ClinicalNoteCard data={clinicalNoteFixture} />);

    expect(screen.getByText(clinicalNoteFixture.note)).toBeInTheDocument();
  });
});
