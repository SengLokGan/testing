import { memo, useMemo } from 'react';
import { WithSx } from '@types';
import { CellType } from '@enums';
import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
import { convertSxToArray } from '@utils/converters/mui';
import RichTableCellCheckbox from '@components/RichTable/components/components/RichTableCellCheckbox';
import RichTableCellAvatar from '@components/RichTable/components/components/RichTableCellAvatar';
import RichTableCellWithoutAvatar from '@components/RichTable/components/components/RichTableCellWithoutAvatar';
import RichTableCellVirology from '@components/RichTable/components/components/RichTableCellVirology';
import RichTableCellCollapseControl from '@components/RichTable/components/components/RichTableCellCollapseControl';
import RichTableCellHdPrescriptionStatus from '@components/RichTable/components/components/RichTableCellHdPrescriptionStatus';
import RichTableCellMedicationStatus from '@components/RichTable/components/components/RichTableCellMedicationStatus';
import RichTableCellLabOrderStatus from '@components/RichTable/components/components/RichTableCellLabOrderStatus';
import RichTableCellAutoIncrement from '@components/RichTable/components/components/RichTableCellAutoIncrement';
import RichTableCellHdProgress from '@components/RichTable/components/components/RichTableCellHdProgress';
import RichTableCellCategoryTitle from '@components/RichTable/components/components/RichTableCellCategoryTitle';
import RichTableCellTwoRowsDateTime from '@components/RichTable/components/components/RichTableCellTwoRowsDateTime';
import RichTableCellDefault from '@components/RichTable/components/components/RichTableCellDefault';
import RichTableCellPhone from '@components/RichTable/components/components/RichTableCellPhone';
import RichTableCellVaccinationStatus from '@components/RichTable/components/components/RichTableCellVaccinationStatus';
import RichTableCellClinicalNotesActions from '@components/RichTable/components/components/RichTableCellClinicalNotesActions';
import RichTableCellSpecialNotes from '@components/RichTable/components/components/RichTableCellSpecialNotes';

type RichTableCellProps = WithSx<{
  sticky?: boolean;
  width?: number;
  maxWidth?: number | string;
  minWidth?: number | string;
  data: any;
  fullData?: any;
  cellCallback?: (props: any) => void;
  cellType?: CellType;
  rowKey?: string;
  rowIndex?: number;
  pagination?: {
    currentPage: number;
    perPage: number;
  };
  isCollapsed?: boolean;
  toggleCollapse?: (key: string) => void;
  format?: (value: string, fullData: any) => any;
  formatLabel?: (value: string, fullData: any) => any;
  checked?: boolean;
  dotsTextOverflow?: boolean;
  multiLines?: boolean;
  onRowSelect?: () => void;
  disabled?: boolean;
}> &
  TableCellProps;

export const RichTableCell = memo(
  ({
    sticky = false,
    cellType = CellType.Text,
    data,
    fullData,
    width = 80,
    minWidth,
    maxWidth,
    sx = [],
    rowKey,
    rowIndex = 0,
    pagination,
    isCollapsed = false,
    toggleCollapse = () => {},
    cellCallback = () => {},
    format = (data, fullData) => data,
    checked = false,
    disabled = false,
    dotsTextOverflow = true,
    multiLines = false,
    onRowSelect,
    ...props
  }: RichTableCellProps) => {
    const renderCell = (cellType: CellType) => {
      const formattedData = format(data, fullData);
      switch (cellType) {
        case CellType.Empty:
          return null;
        case CellType.Avatar:
          return <RichTableCellAvatar data={formattedData} dotsTextOverflow={dotsTextOverflow} />;
        case CellType.WithoutAvatar:
          return <RichTableCellWithoutAvatar data={formattedData} dotsTextOverflow={dotsTextOverflow} />;
        case CellType.Virology:
          return <RichTableCellVirology data={formattedData} />;
        case CellType.SpecialNotes:
          return <RichTableCellSpecialNotes specialNotes={formattedData} />;
        case CellType.CategoryTitle:
          return <RichTableCellCategoryTitle title={formattedData} />;
        case CellType.TwoRowsDateTime:
          return <RichTableCellTwoRowsDateTime data={formattedData} />;
        case CellType.Phone:
          return <RichTableCellPhone data={formattedData} />;
        case CellType.HdPrescriptionStatus: {
          return <RichTableCellHdPrescriptionStatus status={formattedData} dotsTextOverflow={dotsTextOverflow} />;
        }
        case CellType.HdProgress: {
          return <RichTableCellHdProgress data={formattedData} fullData={fullData} cellCallback={cellCallback} />;
        }
        case CellType.MedicationStatus: {
          return <RichTableCellMedicationStatus dotsTextOverflow={dotsTextOverflow} status={formattedData} />;
        }
        case CellType.VaccinationStatus: {
          return <RichTableCellVaccinationStatus dotsTextOverflow={dotsTextOverflow} status={formattedData} />;
        }
        case CellType.AutoIncrement: {
          return <RichTableCellAutoIncrement rowIndex={rowIndex} pagination={pagination} />;
        }
        case CellType.CollapseControl: {
          return (
            <RichTableCellCollapseControl isCollapsed={isCollapsed} onClick={() => rowKey && toggleCollapse(rowKey)} />
          );
        }
        case CellType.Checkbox:
          return (
            <RichTableCellCheckbox
              checked={checked}
              onRowSelect={onRowSelect}
              data={formattedData}
              fullData={fullData}
            />
          );
        case CellType.LabOrderStatus: {
          return (
            <RichTableCellLabOrderStatus
              data={fullData}
              dotsTextOverflow={dotsTextOverflow}
              disabled={disabled}
              status={formattedData}
              cellCallback={cellCallback}
            />
          );
        }
        case CellType.ClinicalNotesActions: {
          return <RichTableCellClinicalNotesActions data={fullData} />;
        }
        default:
          return (
            <RichTableCellDefault data={formattedData} dotsTextOverflow={dotsTextOverflow} multiLines={multiLines} />
          );
      }
    };

    const isCollapseControl = useMemo(() => cellType === CellType.CollapseControl, [cellType]);

    return (
      <TableCell
        sx={[
          (theme) => ({
            position: sticky ? 'sticky' : 'relative',
            zIndex: sticky ? 2 : 1,
            bgcolor: theme.palette.surface.default,
            borderRight: sticky ? `solid 1px ${theme.palette.border.default}` : 'unset',
            width,
            ...(minWidth ? { minWidth } : {}),
            ...(maxWidth ? { maxWidth } : {}),
            px: 2,
            py: 0,
            height: theme.spacing(6.5),
            minHeight: theme.spacing(6.5),
            '&:last-child': {
              pr: 3,
            },
            '&:first-child': {
              pl: 3,
            },
            whiteSpace: dotsTextOverflow ? 'nowrap' : 'normal',
            overflow: dotsTextOverflow ? 'hidden' : 'visible',
            textOverflow: isCollapseControl || dotsTextOverflow ? 'ellipsis' : 'initial',
            textAlign: 'left',
            wordBreak: dotsTextOverflow ? 'normal' : 'break-word',
          }),
          ...convertSxToArray(sx),
        ]}
        {...props}
      >
        {renderCell(cellType)}
      </TableCell>
    );
  },
);
