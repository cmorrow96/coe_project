import { React, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = ({ rows, columns }) => {
  const [pageSize, setPageSize] = useState(10);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      pagination
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOption={[10, 25, 50]}
    ></DataGrid>
  );
};
