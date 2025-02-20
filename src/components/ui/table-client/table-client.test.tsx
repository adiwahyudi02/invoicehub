import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Column, TableClient } from ".";

interface TestData {
  id: number;
  name: string;
  age: number;
}

const columns: Column<TestData>[] = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age", align: "right" },
];

const data: TestData[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
  { id: 4, name: "David", age: 28 },
  { id: 5, name: "Eve", age: 35 },
  { id: 6, name: "Frank", age: 40 },
];

describe("TableClient", () => {
  it("renders table headers correctly", () => {
    render(<TableClient columns={columns} data={data} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders correct number of rows and data", async () => {
    render(
      <TableClient columns={columns} data={data} defaultRowsPerPage={5} />
    );

    const rows = screen
      .getAllByRole("row")
      .filter((row) => !row.closest("tfoot"));
    expect(rows).toHaveLength(6);

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("Charlie")).toBeInTheDocument();
    });
  });

  it("shows skeleton loader when loading", () => {
    render(<TableClient columns={columns} data={data} loading />);
    const rows = screen
      .getAllByRole("row")
      .filter((row) => !row.closest("tfoot"));
    expect(rows).toHaveLength(6);
  });

  it("displays 'There's no data to show!' when data is empty", async () => {
    render(<TableClient columns={columns} data={[]} />);
    await waitFor(() => {
      expect(screen.getByText("There's no data to show!")).toBeInTheDocument();
    });
  });

  it("handles pagination changes", async () => {
    render(
      <TableClient
        columns={columns}
        data={data}
        defaultRowsPerPage={2}
        rowsPerPageOptions={[2, 4]}
      />
    );
    await waitFor(() => {
      // Check first page
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.queryByText("Charlie")).not.toBeInTheDocument();
    });

    // Go to next page
    fireEvent.click(screen.getByLabelText("Go to next page"));

    await waitFor(() => {
      expect(screen.getByText("Charlie")).toBeInTheDocument();
      expect(screen.getByText("David")).toBeInTheDocument();
    });
  });
});
