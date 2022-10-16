import Grid from "@mui/material/Grid";
import { TabTitle } from "src/utils/GeneralFunctions";
import DetailCard from "src/components/DetailCard";
import ListCardJobHome from "src/components/ListCardJobHome";
import "./styles.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobCareByCandidate } from "src/store/slices/main/home/job/jobCandidateSlice";
import { useState } from "react";
import { getJobByCompany } from "src/store/slices/main/home/job/jobSlice";
import { Hidden } from "@mui/material";

const CandidateViewList = () => {
  TabTitle("Công việc quan tâm");

  const { user } = useSelector((state) => state.profile);
  const { jobCare, jobCareHavePage } = useSelector(
    (state) => state.jobCandidateSlice
  );
  const { index, id } = useSelector((state) => state.filter);
  const { jobListCompany } = useSelector((state) => state.job);

  const [jobs, setJobs] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    const token =
      JSON.parse(sessionStorage.getItem("userPresent")) ||
      JSON.parse(localStorage.getItem("userPresent"));
    const page = {
      user: user,
      token: token.token,
      page: {
        no: value - 1,
        limit: 5,
      },
    };
    dispatch(getJobCareByCandidate(page));
  };

  useEffect(() => {
    setJobs(jobCare);
    setJobDetail(jobCare && jobCare[index]?.jobCare);
  }, [index, jobCare]);
  useEffect(() => {
    dispatch(getJobByCompany(id));
  }, [dispatch, id]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="apply__list--container">
        <div className="header__apply">
          <h2 className="header__apply-title">Công việc đã quan tâm</h2>
          <p className="header__apply--des">
            Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển
            ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
          </p>
        </div>
        <>
          <div className="section__apply">
            <span>
              Bạn đã quan tâm <span>{jobCare?.length}</span> việc làm
            </span>
          </div>
          <Grid className="wrapper" spacing={{ xs: 2 }} container>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Grid container spacing={{ xs: 1 }}>
                <Grid item xs={12}>
                  <ListCardJobHome
                    jobList={jobs?.map((item) => {
                      return item.jobCare;
                    })}
                    indexCardActive={index}
                    jobListHavePages={jobCareHavePage}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                <div style={{ height: "90%" }}>
                  <DetailCard
                    logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                    jobDetail={jobDetail}
                    jobList={jobs?.map((item) => {
                      return item.jobCare;
                    })}
                    jobListCompany={jobListCompany}
                  />
                </div>
              </Grid>
            </Hidden>
          </Grid>
        </>
      </div>
    </>
  );
};

export default CandidateViewList;
