import { useEffect, useState } from "react";
import "./styles.scss";
import "./responsive.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivedJobListByUserId,
  getDisabledJobListByUserId,
} from "../../../../store/slices/main/home/job/jobSlice";
import { ListJob } from "./ListJob";
import { TabTitle } from "src/utils/GeneralFunctions";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";
import PaginationCustom from "src/components/Pagination";
import StatisticUser from "src/components/StatisticUser";

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
        <Box sx={{ p: 3, padding: 0 }}>
          <div>{children}</div>
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

const HRPostList = (props) => {
  TabTitle("Công việc đang tuyển | IT Internship JOBS");
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    setPage(1);
  };

  const handleChangePage = (e, value) => {
    window.scrollTo(0, 0);
    setPage(value);
  };

  const {
    jobListActived,
    jobListDisabled,
    totalPages,
    totalItemActive,
    totalItemDisable,
  } = useSelector((state) => state.job);

  const userPresent =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  useEffect(() => {
    dispatch(getActivedJobListByUserId([userPresent.ids, page, 5]));
    dispatch(getDisabledJobListByUserId([userPresent.ids, page, 5]));
  }, [page, dispatch, userPresent.ids]);

  return (
    <div className="hr-post__wrapper">
      <div className="hr-post-list__content">
        <div className="hr-post-list__statistic">
          <StatisticUser
            title="Điểm khả dụng"
            firstObject={{
              score: totalItemActive + totalItemDisable,
              description: "Lượt đăng tuyển",
            }}
            secondObject={{
              score: jobListActived?.length,
              description: "Lượt xem hồ sơ",
            }}
          />
          <StatisticUser
            title="Trạng thái đăng tuyển"
            firstObject={{
              score: totalItemActive,
              description: "Đang đăng tuyển",
            }}
            secondObject={{
              score: totalItemDisable,
              description: "Đã đóng",
            }}
          />
        </div>

        <Box className="filter-panel-home__wrapper" sx={{}}>
          <Box className="filter-panel-home__filterPanel" sx={{}}>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              sx={{
                "& button": {
                  fontSize: "14px !important",
                  textTransform: "uppercase",
                  color: "black !important",
                  fontWeight: "700 !important",
                  flexBasis: "50%",
                },
                "& button.Mui-selected": {
                  color: "#fff !important",
                  background: "#04bf8a",
                  borderRadius: "4px",
                  "&#simple-tab-1": {
                    backgroundColor: "#666 !important",
                  },
                },
                "& span.MuiTabs-indicator": {
                  backgroundColor: "unset !important",
                },
              }}
            >
              <Tab label="Đang đăng tuyển" {...a11yProps(0)} />
              <Tab label="Đã đóng" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel className="tabPanel" value={value} index={0}>
            <ListJob
              listJob={jobListActived?.filter((sp) =>
                sp.status?.name?.includes("Active")
              )}
              message="Không có công việc nào đang đăng tuyển."
              isDisabled={false}
            />
          </TabPanel>
          <TabPanel className="tabPanel" value={value} index={1}>
            <ListJob
              listJob={jobListDisabled}
              message="Không có công việc đã đóng."
              isDisabled={true}
            />
          </TabPanel>
        </Box>
      </div>
      <div className="pagination__wrapper">
        {totalPages > 1 ? (
          <PaginationCustom
            className="pagination"
            totalPages={totalPages}
            handleOnChange={handleChangePage}
            page={page}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HRPostList;
