import "./styles.scss";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const SwitchButton = ({ label, setState, state, onClick }) => {
  const handleOnChange = () => {
    setState(!state);
  };
  return (
    <FormGroup className="switch-btn__wrapper">
      <FormControlLabel
        onChange={handleOnChange}
        onClick={onClick}
        control={<Switch checked={state} />}
        label={label}
      />
    </FormGroup>
  );
};

export default SwitchButton;
