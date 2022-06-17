import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns }) => {
  return (
    <DataGrid
      getRowId={(row) => row.id} 
      rows={rows}
      columns={columns}
      autoHeight
      pagination
      pageSize={25}
    ></DataGrid>
  );
};
export default DataTable;
