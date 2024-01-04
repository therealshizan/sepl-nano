/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from "react";
import {
  Button,
  Link,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { EntriesContext } from "./EntriesContext";
import Popup from "./Popup";
import { numberWithIndianFormat } from "./utils/numbers";
import { useReactToPrint } from "react-to-print";

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

  const TableRef = useRef();

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


  const handlePrint = useReactToPrint({
    content: () => TableRef.current,
    copyStyles: true,
    pageStyle: true
  });



  return (
    <div style={{ flex: 1, margin: "2rem", bgcolor: 'red' }}>
      <TableContainer ref={TableRef}>
        <Table>
          {openPopup && (
            <TableHead>
              <TableCell sx={{ textAlign: 'center' }} colSpan={8}><img src="https://seplnanomagic.com/wp-content/uploads/2023/12/SEPL-Nano-Logo-new-100px-1.png" alt="Sepl nano magic logo" /></TableCell>
            </TableHead>
          )}
          <TableHead sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#fff' } }}>
            <TableRow>
              <TableCell sx={headCellStyles}>Area Name</TableCell>
              <TableCell sx={headCellStyles}>Length</TableCell>
              <TableCell sx={headCellStyles}>Breadth</TableCell>
              <TableCell sx={headCellStyles}>Total Area</TableCell>
              <TableCell sx={headCellStyles}>Selected Product</TableCell>
              <TableCell sx={headCellStyles}>Quantity Required</TableCell>
              <TableCell sx={headCellStyles}>Bottles Required</TableCell>
              <TableCell colSpan={9} sx={headCellStyles} align="right">Total Cost</TableCell>
              <TableCell sx={{borderBottom: 0}} align="right"></TableCell>
              <TableCell sx={{borderBottom: 0}} align="right"></TableCell>
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
                <TableCell colSpan={3} align="right" sx={bodyCellStyles}>
                  ₹ {numberWithIndianFormat(entry.result.totalCost)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={8} sx={bodyCellStyles} align="right">
                Total Cost:
              </TableCell>
              <TableCell align="right" sx={bodyCellStyles}>₹ {numberWithIndianFormat(totalCost)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>


        <Stack mt={3}>
          <Typography variant="body1" fontWeight={600}>Terms and conditions:-</Typography>
          <List disablePadding sx={{ listStyleType: 'disc' }}>
            <ListItem sx={{ display: 'list-item' }} disablePadding><Typography variant="body2">These are product cost estimation only.</Typography></ListItem>
            <ListItem sx={{ display: 'list-item' }} disablePadding><Typography variant="body2">Application/Labour cost is not included in case required.</Typography></ListItem>
            <ListItem sx={{ display: 'list-item' }} disablePadding><Typography variant="body2">Actual quotation will be send to you by mail after you receive a call from our office and post site visit by our representative for actual measurements if necessary.</Typography></ListItem>
            <ListItem sx={{ display: 'list-item' }} disablePadding><Typography variant="body2">Additional GST of 18% will be applicable on invoice / quotation mailed to you.</Typography></ListItem>
          </List>
        </Stack>
      </TableContainer>

      <Stack mt={2}>
        <Button
          size="small"
          variant="contained"
          // href="mailto:shaikhshizan1181@gmail.com?subject={subject}&body={body}"
          onClick={() => {
            if (entries.length == 0) {
              alert("No Data Found!")
            } else {
              setOpenPopup(!openPopup);
            }
          }}
          sx={{ bgcolor: '#D7B56D', '&:hover': { bgcolor: '#D7B56D' } }}
        >
          Submit & Print Data
        </Button>
      </Stack>

      {openPopup && (
        <Popup
          open={openPopup}
          onClose={handleClosePopup}
          downloadCSV={downloadCSV}
          handlePrint={handlePrint}
        />
      )}
    </div>
  );
};

export default EntriesTable;
