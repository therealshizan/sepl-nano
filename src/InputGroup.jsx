import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import products from "./assets/products.json";
import roomMaster from "../public/roomMaster.json";
import { EntriesContext } from "./EntriesContext";

const InputGroup = () => {
  const [areas, setAreas] = useState([])
  // Context for managing entries
  const { entries, setEntries } = useContext(EntriesContext);

  // State for form data, result, and button disable
  const [formData, setFormData] = useState({
    projectType: 'Residential',
    areaName: '',
    length: "",
    breadth: "",
    product: products.products[0].product,
  });

  const [result, setResult] = useState({
    quantityRequired: 0,
    bottlesRequired: 0,
    totalCost: 0,
  });

  const [buttonDisable, setButtonDisabled] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Calculate bottles and update result and entries
  const calculateBottles = () => {
    const length = parseFloat(formData.length);
    const breadth = parseFloat(formData.breadth);

    if (length > 0 && breadth > 0) {
      const selectedProduct = products.products.find(
        (item) => item.product.toLowerCase() === formData.product.toLowerCase()
      );

      if (selectedProduct) {
        const coverageArea = parseFloat(
          selectedProduct.approxApplicationCoverageAreaPerLitre
        );
        const costPerSqFt = selectedProduct.approxCostPerSqFt;

        const totalArea = length * breadth;
        const bottlesRequired = totalArea / coverageArea;

        // Calculate total cost
        const totalCost =
          Math.ceil(bottlesRequired) * costPerSqFt * totalArea;

        // Update result state
        setResult((prevResult) => ({
          ...prevResult,
          quantityRequired: bottlesRequired.toFixed(2),
          bottlesRequired: Math.ceil(bottlesRequired.toFixed(2)),
          totalCost: totalCost.toFixed(2),
        }));

        // Update entries
        setEntries((prevEntries) => [
          ...prevEntries,
          { formData, result: { quantityRequired: bottlesRequired, bottlesRequired: Math.ceil(bottlesRequired), totalCost } },
        ]);

        setButtonDisabled(true);
      } else {
        // Reset result if product is not found
        setResult({
          quantityRequired: 0,
          bottlesRequired: 0,
          totalCost: 0,
        });
      }
    } else {
      // Alert if length or breadth is not provided
      alert("All Fields Are Required");
      console.error("All Fields Are Required");
    }
  };

  // Handle project type change
  const handleProjectType = (e) => {
    setFormData({
      ...formData,
      projectType: e.target.value,
    });
  };

  // Handle area name change
  const handleAreaChange = (e) => {
    setFormData({
      ...formData,
      areaName: e.target.value,
    });
  };

  // Handle product change
  const handleProductChange = (e) => {
    setFormData({
      ...formData,
      product: e.target.value,
    });
  };


  useEffect(()=>{
    const filteredAreas = roomMaster.roomMaster.filter(room => room.projectType === formData.projectType)
    setAreas(filteredAreas)
    setFormData({
      ...formData,
      areaName: filteredAreas[0].roomName
    })
    console.log({areas})
  }, [formData.projectType])

  return (
    <div style={{ margin: "1rem", borderBottom: "1px solid #00000025", padding: "1rem" }}>
      {/* Form inputs */}
      <Stack sx={{ mb: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 16.66%)' }} direction={"row"} alignItems={"stretch"}>
        <Select
          size="small"
          name="projectType"
          onChange={(e) => handleProjectType(e)}
          value={formData.projectType}
          sx={{ flex: 1, fontSize: 12 }}
          disabled={buttonDisable}
          >
            <MenuItem sx={{fontSize: 12}} value={'Residential'}>
              {'Residential'}
            </MenuItem>
            <MenuItem sx={{fontSize: 12}} value={'Commercial'}>
              {'Commercial'}
            </MenuItem>
        </Select>
        <Select
          size="small"
          name="areaName"
          onChange={(e) => handleAreaChange(e)}
          value={formData.areaName}
          sx={{ flex: 1, fontSize: 12 }}
          disabled={buttonDisable}
          >
          {/* Dropdown options for area names */}
          {areas.map((room) => (
            <MenuItem sx={{fontSize: 12}} key={room.roomCode} value={room.roomName}>
              {room.roomName}
            </MenuItem>
          ))}
        </Select>
        <TextField
          size={"small"}
          value={formData.length}
          sx={{ flex: 2 }}
          label="Length (sq.ft)"
          type="number"
          onChange={(e) => handleChange(e)}
          name="length"
          disabled={buttonDisable}
          />
        <TextField
          size={"small"}
          value={formData.breadth}
          sx={{ flex: 2 }}
          label="Breadth (sq.ft)"
          type="number"
          onChange={(e) => handleChange(e)}
          name="breadth"
          disabled={buttonDisable}
          />
        <Select
          size="small"
          name="product"
          onChange={(e) => handleProductChange(e)}
          value={formData.product}
          sx={{ flex: 1, fontSize: 12 }}
          disabled={buttonDisable}
          >
          {/* Dropdown options for products */}
          {products.products.map((product) => (
            <MenuItem key={product.srNo} value={product.product}>
              {product.product}
            </MenuItem>
          ))}
        </Select>
        {/* Calculate button */}
        <Button
          size="small"
          onClick={calculateBottles}
          variant="contained"
          disableElevation
          disabled={buttonDisable}
          sx={{bgcolor: '#D7B56D', '&:hover': {bgcolor: '#D7B56D'}}}
        >
          Calculate
        </Button>
      </Stack>

      {/* Result display */}
      <div>
        <span style={{ fontSize: '0.9rem' }}>
          {formData.areaName === "" ? "Area" : formData.areaName} will need{" "}
          {result.bottlesRequired} bottles to cover the area.
        </span>
        <span style={{ fontSize: '0.9rem' }}>The total cost will be Rs. {result.totalCost}</span>
      </div>
    </div>
  );
};

export default InputGroup;
