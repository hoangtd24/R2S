import React from "react";
import "./styles.scss";
import { Checkbox, FormControlLabel } from "@mui/material";

const CustomCheckbox = ({ label, onChange, checked }) => {
  const inputRef = React.useRef(null);
  const handleChange = (e) => {
    const checkedName = e.target.name;
    const checkedValue = e.target.checked;
    onChange && onChange(checkedName, checkedValue);
  };
  return (
    <FormControlLabel
      onChange={handleChange}
      className="formControlLabel"
      name={label}
      checked={checked}
      ref={inputRef}
      control={
        <Checkbox
          className="checkBoxColor"
          sx={{
            color: "#04bf8a",
          }}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
