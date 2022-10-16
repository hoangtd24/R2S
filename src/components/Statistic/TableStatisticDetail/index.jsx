import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./styles.scss";
import TableData from "./TableData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function createData(name, post, email, phone) {
    return { name, post, email, phone };
}

const data1 = [
    createData('công ty R2S', 159, 6.0, 24, 4.0),
    createData('công ty R2S2', 237, 9.0, 37, 4.3),
    createData('công ty R2S3', 262, 16.0, 24, 6.0),
    createData('công ty R2S4', 305, 3.7, 67, 4.3),
    createData('công ty VNG', 262, 16.0, 24, 6.0),
    createData('công ty RVNG', 305, 3.7, 67, 4.3),
];


const data2 = [
  createData('công ty VNG', 159, 6.0, 24, 4.0),
  createData('công ty VNG', 237, 9.0, 37, 4.3),
  createData('công ty VNG', 262, 16.0, 24, 6.0),
  createData('công ty RVNG', 305, 3.7, 67, 4.3),
  createData('công ty VNG', 262, 16.0, 24, 6.0),
  createData('công ty RVNG', 305, 3.7, 67, 4.3),
];

const TableStatisticDetail = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="table-statistic-container">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Công ty" {...a11yProps(0)} />
            <Tab label="Trường học" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TableData rows={data1}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <TableData rows={data2}/>
        </TabPanel>
      </Box>
    </div>
  );
};

export default TableStatisticDetail;
