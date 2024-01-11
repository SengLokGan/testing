import React, { PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import update from 'immutability-helper';
import uniqId from 'uniqid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import {
  EmptyDataBody,
  PaginationComponent,
  PaginationComponentProps,
  RichTableCell,
  TableHeaderCell,
  TableHeaderRow,
} from '@components';
import { Column, HighlightedRow, Row, WithSx } from '@types';
import { CellType, RowType } from '@enums';
import { convertSxToArray } from '@utils/converters/mui';
import { theme } from '@src/styles';

type RichTableProps = PropsWithChildren<
  WithSx<{
    tableContainerProps?: WithSx<{}>;
    renderBody?: boolean;
    preColumns?: WithSx<Column>[];
    nextColumns?: WithSx<Column>[];
    columns: WithSx<Column[]>;
    rows: Row[];
    collapsableRow?: boolean;
    multipleCollapse?: boolean;
    renderCollapsableRow?: (item: any) => ReactNode;
    stickyHeader?: boolean;
    fullScreen?: boolean;
    headerDivider?: boolean;
    isDataLoading: boolean;
    defaultHeaderContainer?: boolean;
    rowExtraProps?: {
      condition: (data?: any) => boolean;
      props: any;
    }[];
    highlightedRows?: HighlightedRow[];
    selectedRows?: any[];
    onRowSelect?: (id: number) => void;
    onAllRowsSelect?: () => void;
    multiPagination?: boolean;
    isOuterPaginationHandler?: boolean;
    emptyBodyBGColor?: string;
  }>
> &
  Partial<Omit<PaginationComponentProps, 'isSticky'>>;

export const RichTable = ({
  tableContainerProps = {},
  renderBody = true,
  preColumns = [],
  nextColumns = [],
  stickyHeader = false,
  collapsableRow = false,
  multipleCollapse = false,
  renderCollapsableRow,
  rows,
  columns,
  isDataLoading,
  defaultHeaderContainer = true,
  children,
  fullScreen,
  headerDivider,
  sx,
  pagination,
  multiPagination = false,
  isOuterPaginationHandler = false,
  onChangePage,
  onChangeRowsPerPage,
  rowExtraProps,
  highlightedRows,
  selectedRows,
  onRowSelect,
  onAllRowsSelect,
  emptyBodyBGColor,
}: RichTableProps) => {
  const [tableData, setTableData] = useState({
    preColumns,
    columns,
    nextColumns,
    rows,
  });
  const [collapsedRows, setCollapsedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (rows && columns) {
      setTableData({ columns, preColumns, nextColumns, rows });
    }
  }, [rows, columns, collapsableRow]);

  const getStickyPosition = useCallback(
    (index: number, width?: number) => {
      if (!width) return 'unset';
      if (index === 0) return 0;
      let position = 0;
      for (let i = index; i >= 1; i--) {
        if (tableData.columns[i - 1].sticky) {
          position += tableData.columns[i - 1].width ?? 0;
        }
      }
      return position;
    },
    [tableData],
  );

  const handleResize = useCallback(
    (index: number, width: number) => {
      setTableData((prevState) => {
        const newColumns = [...prevState.columns];
        const newPreColumns = [...prevState.preColumns];
        const newNextColumns = [...prevState.nextColumns];
        if (newPreColumns[index]) {
          newPreColumns[index] = {
            ...newPreColumns[index],
            width,
            minWidth: width,
            maxWidth: width,
          };
        }
        if (newColumns[index]) {
          newColumns[index] = {
            ...newColumns[index],
            width,
            minWidth: width,
            maxWidth: width,
          };
        }
        if (newNextColumns[index]) {
          newNextColumns[index] = {
            ...newNextColumns[index],
            width,
            minWidth: width,
            maxWidth: width,
          };
        }
        return { ...prevState, columns: newColumns, preColumns: newPreColumns, nextColumns: newNextColumns };
      });
    },
    [setTableData],
  );

  const handleMoveColumn = useCallback(
    () => (dragIndex, hoverIndex) => {
      setTableData((prevState) => {
        const dragColumn = prevState.columns[dragIndex];

        return {
          ...prevState,
          columns: update(prevState.columns, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragColumn],
            ],
          }),
          preColumns: prevState?.preColumns?.length
            ? update(prevState.preColumns, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, prevState.preColumns[dragIndex]],
                ],
              })
            : prevState.preColumns,
          nextColumns: prevState?.nextColumns?.length
            ? update(prevState.nextColumns, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, prevState.nextColumns[dragIndex]],
                ],
              })
            : prevState.nextColumns,
        };
      });
    },
    [setTableData],
  );

  const toggleCollapsedRow = useCallback(
    (key: string) => {
      const cloneCollapsedRows = new Set(collapsedRows);
      if (cloneCollapsedRows.has(key)) {
        cloneCollapsedRows.delete(key);
        setCollapsedRows(cloneCollapsedRows);
      } else {
        !multipleCollapse && cloneCollapsedRows.clear();
        cloneCollapsedRows.add(key);
        setCollapsedRows(cloneCollapsedRows);
      }
    },
    [collapsedRows, multipleCollapse, setCollapsedRows],
  );

  const getCellAdditionalStyles = useCallback(
    ({ theme, isCollapsed = false, isCategoryTitle = false }) => {
      if (isCategoryTitle) return { backgroundColor: (theme) => theme.palette.background.default };
      if (collapsableRow)
        return { backgroundColor: isCollapsed ? 'rgba(0, 99, 153, 0.08)' : theme.palette.surface.default };
      return {};
    },
    [collapsableRow],
  );

  const getExtraRowProps = useCallback(
    (row): any => {
      const props = rowExtraProps?.reduce(
        (rowPropsData, rowCondition) =>
          rowCondition.condition(row) ? { ...rowPropsData, ...rowCondition.props } : rowPropsData,
        {},
      );
      return props;
    },
    [rowExtraProps],
  );

  const getRowCategoryParams = useCallback((row) => {
    return row && row.rowCategoryParams ? row.rowCategoryParams : {};
  }, []);

  const onRowSelectCallback = useCallback(
    (row) => {
      if (onRowSelect) {
        return onRowSelect(+row.id);
      }
    },
    [onRowSelect],
  );

  const columnWidthSum = useMemo(() => {
    return tableData.columns.reduce((sum, col) => (col?.width ? sum + col.width : sum), 0);
  }, [tableData.columns]);

  const columnsWithoutWidth = useMemo(() => {
    return tableData.columns.reduce((sum, col) => (col?.width ? sum++ : sum), 0);
  }, [tableData.columns]);

  const renderRightBorder = (theme) => `1px solid ${theme.palette.border.default}`;

  const setRowBGColor = (rowId: number, type: 'highlighted' | 'selected', color?: string) => {
    if (type === 'selected') {
      return theme.palette.primary.light;
    }
    if (type === 'highlighted') {
      return color || theme.palette.surface.default;
    }
    return theme.palette.surface.default;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer
        {...tableContainerProps}
        sx={[
          (theme) => ({ backgroundColor: theme.palette.surface.default }),
          !tableData.rows.length &&
            (() => ({
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            })),
          ...convertSxToArray(tableContainerProps?.sx || {}),
        ]}
      >
        {children && defaultHeaderContainer && (
          <Box
            sx={{
              position: 'sticky',
              left: 0,
              px: 3,
              py: 2,
              zIndex: 10,
              borderBottom: (theme) => (headerDivider ? `solid 1px ${theme.palette.border.default}` : 'initial'),
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
            }}
          >
            {children}
          </Box>
        )}
        {!defaultHeaderContainer && children}

        {renderBody ? (
          <>
            {!tableData.rows.length && !isDataLoading ? (
              <EmptyDataBody bgcolor={emptyBodyBGColor} />
            ) : (
              <>
                {multiPagination && pagination && onChangePage && onChangeRowsPerPage && (
                  <PaginationComponent
                    pagination={pagination}
                    isOuterPaginationHandler={isOuterPaginationHandler}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    isSticky
                  />
                )}
                <Table
                  stickyHeader={stickyHeader}
                  aria-label="sticky table"
                  sx={[{ width: fullScreen ? '100%' : 'unset' }, ...convertSxToArray(sx)]}
                >
                  <TableHead sx={{ position: stickyHeader ? 'sticky' : 'initial', zIndex: 10, top: 0 }}>
                    {!!tableData?.preColumns?.length && (
                      <TableHeaderRow
                        columns={tableData.preColumns}
                        stickyHeader={stickyHeader}
                        getStickyPosition={getStickyPosition}
                        handleMoveColumn={handleMoveColumn}
                        handleResize={handleResize}
                        renderRightBorder={renderRightBorder}
                      />
                    )}
                    <TableRow>
                      {tableData.columns.map(
                        ({ id, align, label, cellCallback, withRightBorder, dotsTextOverflow, ...column }, index) => (
                          <TableHeaderCell
                            key={uniqId()}
                            index={index}
                            onMoveColumn={handleMoveColumn()}
                            onResize={handleResize as any}
                            stickyHeader={stickyHeader}
                            align={align}
                            checked={tableData.rows.length === selectedRows?.length}
                            indeterminate={
                              selectedRows?.length !== tableData.rows.length && selectedRows && selectedRows.length > 0
                            }
                            onAllRowsSelect={onAllRowsSelect}
                            {...column}
                            sx={{
                              width: column?.width
                                ? column.width
                                : `calc((100% - ${columnWidthSum}px) / ${columnsWithoutWidth})`,
                              maxWidth: column?.maxWidth
                                ? column.maxWidth
                                : `calc((100% - ${columnWidthSum}px) / ${columnsWithoutWidth})`,
                              minWidth: column?.minWidth
                                ? column.minWidth
                                : `calc((100% - ${columnWidthSum}px) / ${columnsWithoutWidth})`,
                              left: column.sticky ? getStickyPosition(index, column.width) : 'unset',
                              borderRight: (theme) => (withRightBorder ? renderRightBorder(theme) : ''),
                            }}
                          >
                            {label}
                          </TableHeaderCell>
                        ),
                      )}
                    </TableRow>
                    {!!tableData?.nextColumns?.length && (
                      <TableHeaderRow
                        columns={tableData.nextColumns}
                        stickyHeader={stickyHeader}
                        getStickyPosition={getStickyPosition}
                        handleMoveColumn={handleMoveColumn}
                        handleResize={handleResize}
                        renderRightBorder={renderRightBorder}
                      />
                    )}
                    {isDataLoading && (
                      <TableRow
                        sx={[
                          (theme) => ({ height: theme.spacing(0.5), position: 'relative', zIndex: 4 }),
                          stickyHeader &&
                            ((theme) => ({
                              position: 'sticky',
                              left: 0,
                              top: theme.spacing(7),
                            })),
                        ]}
                      >
                        <TableCell padding="none" colSpan={columns.length}>
                          <LinearProgress sx={{ width: '100%', position: 'absolute', left: 0, bottom: 0 }} />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableHead>
                  <TableBody
                    sx={(theme) => ({
                      '& .MuiTableRow-hover:hover td': {
                        bgcolor: theme.palette.border.default,
                      },
                    })}
                  >
                    {tableData.rows.map((row, rowIndex) => {
                      const isCollapsed = collapsedRows.has(row.id.toString());

                      if (row.rowType === RowType.Category) {
                        const { sx, ...props } = getRowCategoryParams(row);

                        return (
                          <React.Fragment key={row.id}>
                            <TableRow
                              {...getExtraRowProps(row)}
                              sx={[
                                {
                                  '& > td': (theme) => getCellAdditionalStyles({ theme, isCategoryTitle: true }),
                                },
                                getExtraRowProps(row)?.sx,
                                ...convertSxToArray(sx),
                              ]}
                            >
                              <RichTableCell
                                key={`${rowIndex}-${row.id}`}
                                rowKey={`${row.id}`}
                                rowIndex={rowIndex}
                                data={row.label}
                                fullData={row}
                                cellType={CellType.CategoryTitle}
                                {...props}
                                sx={[
                                  {
                                    left: props?.sticky ? getStickyPosition(0, props?.width) : 'unset',
                                    borderRight: (theme) => renderRightBorder(theme),
                                  },
                                ]}
                              />
                              <TableCell colSpan={columns.length} sx={convertSxToArray(row?.rowProps?.sx)} />
                            </TableRow>
                          </React.Fragment>
                        );
                      }

                      return (
                        <React.Fragment key={row.id}>
                          <TableRow
                            {...getExtraRowProps(row)}
                            sx={[
                              (theme) => ({
                                '& > td': getCellAdditionalStyles({ theme, isCollapsed }),
                              }),
                              getExtraRowProps(row)?.sx,
                            ]}
                          >
                            {tableData.columns.map(
                              (
                                {
                                  id,
                                  sticky,
                                  width,
                                  maxWidth,
                                  minWidth,
                                  cellType,
                                  format,
                                  sx,
                                  cellCallback,
                                  withRightBorder,
                                  dotsTextOverflow = true,
                                  multiLines = false,
                                  disabled,
                                },
                                columnIndex,
                              ) => {
                                return (
                                  <RichTableCell
                                    key={`${rowIndex}-${id}-${columnIndex}`}
                                    disabled={disabled}
                                    rowKey={`${row.id}`}
                                    rowIndex={rowIndex}
                                    sticky={sticky}
                                    width={width}
                                    minWidth={minWidth}
                                    maxWidth={maxWidth}
                                    cellType={cellType}
                                    cellCallback={cellCallback}
                                    format={format}
                                    pagination={pagination}
                                    sx={[
                                      (theme) => ({
                                        width: width
                                          ? width
                                          : `calc((100% - ${columnWidthSum}px) / ${columnsWithoutWidth})`,
                                        maxWidth: maxWidth
                                          ? maxWidth
                                          : `calc((100% - ${columnWidthSum}px) / ${columnsWithoutWidth})`,
                                        minWidth: minWidth
                                          ? minWidth
                                          : `calc((100% - ${columnWidthSum}80px) / ${columnsWithoutWidth})`,
                                        left: sticky ? getStickyPosition(columnIndex, width) : 'unset',
                                        borderRight: withRightBorder ? renderRightBorder(theme) : '',
                                        bgcolor: setRowBGColor(
                                          (selectedRows?.includes(row.id) && selectedRows[row.id]) ||
                                            (highlightedRows?.find((item) => item.id === row.id) &&
                                              highlightedRows[row.id]),
                                          selectedRows?.includes(row.id) ? 'selected' : 'highlighted',
                                          highlightedRows?.find((item) => item.id === row.id)?.color,
                                        ),
                                      }),
                                      ...convertSxToArray(sx),
                                    ]}
                                    data={row[id]}
                                    fullData={row}
                                    isCollapsed={isCollapsed}
                                    toggleCollapse={toggleCollapsedRow}
                                    onRowSelect={() => onRowSelectCallback(row)}
                                    checked={selectedRows?.includes(row.id)}
                                    dotsTextOverflow={dotsTextOverflow}
                                    multiLines={multiLines}
                                  />
                                );
                              },
                            )}
                          </TableRow>
                          {collapsableRow && renderCollapsableRow && (
                            <TableRow
                              sx={{
                                backgroundColor: (theme) => theme.palette.surface.default,
                                '& td ': {
                                  borderBottom: !isCollapsed ? 'none' : '1px solid rgba(224,224,224,1)',
                                },
                              }}
                            >
                              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} />
                              <TableCell colSpan={columns.length} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
                                  {renderCollapsableRow(row)}
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
                {pagination && onChangePage && onChangeRowsPerPage && (
                  <PaginationComponent
                    pagination={pagination}
                    isOuterPaginationHandler={isOuterPaginationHandler}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    isSticky
                  />
                )}
              </>
            )}
          </>
        ) : null}
      </TableContainer>
    </DndProvider>
  );
};
