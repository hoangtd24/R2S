import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import './styles.scss'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const SelectMulti = ({
  arrList,
  id,
  register,
  placeholder,
  dispatch = () => {},
  action = () => {},
  className,
  label,
  requirementField = true,
  children,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleClick = (number) => {
    dispatch(action(number));
  };
  return (
      <div className={`select-form ${className ? className : ""}`}>
        <h1 className="select-label">
          {label}
          {requirementField && <span className="field-requirment">*</span>}
        </h1>
        <FormControl
          sx={{ width: "100%", border: "1px solid #04bf8a", marginTop: "-1px"}}
        >
          {personName.length > 0 ? "" : <InputLabel id="demo-multiple-chip-label" style={{fontSize :  13, padding : "0 !important"}}>{placeholder}</InputLabel>}
          <Select
            className="container_form_post"
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            {...register(id)}
            onChange={handleChange}
            input={<OutlinedInput   sx={{ padding : "-4px 14px"}}  id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {arrList.map((name) => (
              <MenuItem
                onClick={() => {
                  handleClick(name.id);
                }}
                key={name}
                value={name.name}
                style={getStyles(name, personName, theme)}
              >
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <p className="select-error">{children}</p>
      </div>
  );
};

export default SelectMulti;
