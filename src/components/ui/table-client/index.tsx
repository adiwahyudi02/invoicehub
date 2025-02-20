"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
  Skeleton,
} from "@mui/material";
import React, { useState, useEffect } from "react";

export interface Column<T> {
  label: string;
  key?: keyof T;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
}

interface TableClientProps<T> {
  data: T[];
  columns: Column<T>[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  loading?: boolean;
}

export function TableClient<T>({
  data,
  columns,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
  loading = false,
}: TableClientProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);

  // Show skeleton loader for at least 0.5 second after data changes and loading is true
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading && !!data.length) {
      setShowSkeletonLoader(true);
    } else {
      setShowSkeletonLoader(true);
      timer = setTimeout(() => {
        setShowSkeletonLoader(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [data, loading]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (column.render) return column.render(row);
    if (column.key) {
      const value = row[column.key];
      return typeof value === "string" || typeof value === "number"
        ? value
        : "-";
    }
    return "-";
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align || "left"}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {showSkeletonLoader || loading ? (
            // Show skeleton loader while loading or during the initial state
            Array.from(new Array(rowsPerPage)).map((_, index) => (
              <TableRow key={index}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align={column.align || "left"}>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            // Display "no data" message if data is empty
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                There&apos;s no data to show!
              </TableCell>
            </TableRow>
          ) : (
            // Show actual data after loading is complete
            (rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align={column.align || "left"}>
                    {getCellValue(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
