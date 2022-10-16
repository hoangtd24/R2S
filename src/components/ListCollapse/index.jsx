import React from "react";
import "./styles.scss";
import CustomCheckbox from "../CustomCheckbox";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const ListCollapse = (props) => {
  const [open, setOpen] = React.useState(false);

  const spacing = props.spacing;

  const handleCheck = (valueName, valueCheck) => {
    props.onChange && props.onChange(valueName, valueCheck);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        borderRadius: "6px",
        border: "1px solid #DEDEDE",
        marginBottom: "20px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton className="listButton" onClick={handleClick}>
        <ListItemText
          className="listTitle"
          primary={`${props.title}`}
          sx={{
            "& span": {
              fontSize: "16px",
              color: "#04bf8a",
              fontWeight: "700",
            },
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.list?.length > 0
          ? props.list?.map((item, index) => (
              <List key={item.id} component="div" disablePadding>
                <ListItemButton sx={{ pl: spacing }}>
                  <ListItemIcon>
                    <CustomCheckbox
                      key={item.id}
                      label={item.name}
                      onChange={handleCheck}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </List>
            ))
          : ""}
      </Collapse>
    </List>
  );
};

export default ListCollapse;
