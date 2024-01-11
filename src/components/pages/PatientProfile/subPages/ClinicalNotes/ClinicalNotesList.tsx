import { useParams } from 'react-router-dom';
import {
  changeClinicalNotesPage,
  changeClinicalNotesRowsPerPage,
  selectClinicalNotesList,
  selectClinicalNotesTablePagination,
} from '@store/slices';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { ClinicalNoteCard } from '@components/pages/PatientProfile/subPages/ClinicalNotes/ClinicalNoteCard/ClinicalNoteCard';
import { PaginationComponent } from '@components/RichTable';
import Box from '@mui/material/Box';
import { theme } from '@src/styles';

export const ClinicalNotesList = () => {
  const clinicalNotes = selectClinicalNotesList();
  const pagination = selectClinicalNotesTablePagination();
  const { id } = useParams();

  if (!id) return null;
  return (
    <Box sx={{ bgcolor: theme.palette.surface.default }}>
      <PaginationComponent
        pagination={pagination}
        onChangePage={(page) => changeClinicalNotesPage({ paginationValue: page, patientId: +id })}
        onChangeRowsPerPage={(rows) => changeClinicalNotesRowsPerPage({ paginationValue: rows, patientId: +id })}
        sx={{ overflow: 'visible' }}
      />
      <Divider />
      <Stack direction="column">
        {clinicalNotes.map((note) => (
          <ClinicalNoteCard key={note.id} data={{ ...note }} />
        ))}
      </Stack>
      <PaginationComponent
        pagination={pagination}
        onChangePage={(page) => changeClinicalNotesPage({ paginationValue: page, patientId: +id })}
        onChangeRowsPerPage={(rows) => changeClinicalNotesRowsPerPage({ paginationValue: rows, patientId: +id })}
        sx={{ overflow: 'visible' }}
      />
    </Box>
  );
};
