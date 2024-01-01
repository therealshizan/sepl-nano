/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import {
  Button,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { EntriesContext } from "./EntriesContext";
import Popup from "./Popup";

const headCellStyles = {
  fontSize: "12px",
  border: "1px solid",
  padding: 1,
  lineHeight: 1,
  fontWeight: 500,
  color: '#161616',
  fontWeight: 600
};
const bodyCellStyles = {
  fontSize: "12px",
  border: "1px solid",
  padding: 1,
  lineHeight: 1,
};

const EntriesTable = () => {
  const { entries } = useContext(EntriesContext);

  const [openPopup, setOpenPopup] = useState(false);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const downloadCSV = () => {
    // Include headers
    const headers = [
      "Area Type",
      "Area Name",
      "Length",
      "Breadth",
      "Selected Product",
      "Quantity Required",
      "Bottles Required",
      "Total Cost",
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" + // Header row
      entries
        .map((entry) =>
          Object.values(entry.formData)
            .concat(Object.values(entry.result))
            .join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "entries.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Calculate total cost
  const totalCost = entries.reduce(
    (acc, entry) => acc + parseFloat(entry.result.totalCost),
    0
  );
  return (
    <div style={{ flex: 1, margin: "2rem", marginRight: 0, marginTop: 0 }}>
      <TableContainer>
        <Table>
          <TableHead sx={{bgcolor: '#fff', '&:hover': {bgcolor: '#fff'}}}>
            <TableRow>
              <TableCell sx={headCellStyles}>Area Name</TableCell>
              <TableCell sx={headCellStyles}>Length</TableCell>
              <TableCell sx={headCellStyles}>Breadth</TableCell>
              <TableCell sx={headCellStyles}>Total Area</TableCell>
              <TableCell sx={headCellStyles}>Selected Product</TableCell>
              <TableCell sx={headCellStyles}>Quantity Required</TableCell>
              <TableCell sx={headCellStyles}>Bottles Required</TableCell>
              <TableCell sx={headCellStyles}>Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, i) => (
              <TableRow key={i}>
                <TableCell sx={bodyCellStyles}>
                  {entry.formData.areaName}
                </TableCell>
                <TableCell sx={bodyCellStyles}>
                  {entry.formData.length}
                </TableCell>
                <TableCell sx={bodyCellStyles}>
                  {entry.formData.breadth}
                </TableCell>
                <TableCell sx={bodyCellStyles}>
                  {entry.formData.length * entry.formData.breadth}
                </TableCell>
                <TableCell sx={bodyCellStyles}>
                  {entry.formData.product}
                </TableCell>
                <TableCell sx={bodyCellStyles}>
                  {parseFloat(entry.result.quantityRequired).toFixed(2)}
                </TableCell>
                <TableCell sx={bodyCellStyles}>
                  {parseFloat(entry.result.bottlesRequired)}
                </TableCell>
                <TableCell sx={bodyCellStyles}>
                  ₹{parseFloat(entry.result.totalCost).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={7} sx={bodyCellStyles} align="right">
                Total Cost:
              </TableCell>
              <TableCell sx={bodyCellStyles}>₹{totalCost.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack mt={2}>
        <Button
          size="small"
          variant="contained"
          // href="mailto:shaikhshizan1181@gmail.com?subject={subject}&body={body}"
          onClick={() => {
            if(entries.length == 0){
              alert("No Data Found!")
            }else{
              setOpenPopup(!openPopup);
            }
          }}
          sx={{bgcolor: '#D7B56D', '&:hover': {bgcolor: '#D7B56D'}}}
        >
          Submit & Download Data
        </Button>
      </Stack>

      {openPopup && (
        <Popup
          open={openPopup}
          onClose={handleClosePopup}
          downloadCSV={downloadCSV}
        />
      )}
    </div>
  );
};

export default EntriesTable;
