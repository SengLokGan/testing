import { PatientStatuses, FileTypes } from '@enums';
import { DataRow, FileLink } from '@components';
import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import type { FileDocument, WithSx } from '@types';

type PatientStatusFilesProps = WithSx<{
  title: string;
  patientId: string | number;
  status: PatientStatuses;
  files: FileDocument[];
}>;

export const PatientStatusFiles = ({ patientId, title, status, files = [], sx = [] }: PatientStatusFilesProps) => {
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      {patientId &&
      (status === PatientStatuses.Permanent ||
        status === PatientStatuses.Hospitalized ||
        status === PatientStatuses.Dead) &&
      files.length > 0 ? (
        <DataRow
          isCompact={isXs}
          title={title}
          value={files.map((file) => (
            <FileLink
              key={file.id}
              withSize={Boolean(file.size)}
              file={file}
              patientId={patientId.toString()}
              queryParams={`?type=${FileTypes.Status}`}
            />
          ))}
          sx={sx}
        />
      ) : null}
    </>
  );
};
