import React from "react";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import "./styles.scss";
import CardHome from "../CardHome";
import moment from "moment";
import { useSelector } from "react-redux";

const ContentBaseInformation = ({
  jobDetail,
  jobListCompany,
  pdLeft,
  pdRight,
  hideMark = false,
  mgLeft,
  none__time,
}) => {
  const location = useLocation();
  const pathUrl = location.pathname;
  const { indexCardActive } = useSelector((state) => state.job);

  return (
    <div>
      <div className="job-applying-container _scroll">
        <h5
          className="intro__company-title intro__company-title-appling"
          style={{
            marginLeft: `${mgLeft ? mgLeft : ""}`,
          }}
        >
          Việc làm đang tuyển
        </h5>
        <Grid
          container
          spacing={1}
          sx={{
            width: "auto",
          }}
        >
          {jobListCompany?.length > 0 &&
            jobListCompany?.map((job, index) => (
              <Grid
                item
                lg="12"
                md="12"
                sm="12"
                key={job.id}
                sx={{
                  paddingLeft: pdLeft ? `${pdLeft} !important` : "",
                  paddingRight: pdRight ? `${pdRight} !important` : "",
                  width: "200px",
                }}
              >
                <Link
                  to={`/detail_job/${job.id}`}
                  className="link__job-detail"
                >
                  <CardHome
                    id={job.id}
                    index={index}
                    title={job.name}
                    fontSize={10}
                    nameCompany={job.hr?.company?.name}
                    idCompany={job.hr?.company?.id}
                    job={job}
                    // key={job.id}
                    idJob={job.id}
                    tagName={[
                      job?.jobposition?.name ||
                        job?.position.name ||
                        "Không có",
                      job?.jobType?.name || "Không có",
                    ]}
                    location={job.locationjob?.district?.province?.name}
                    amount={job.amount || "Không có"}
                    demandPartner={true}
                    time={[
                      moment(job.timeStartStr || job.createDate).format(
                        "DD/MM/YYYY"
                      ),
                      moment(job.timeEndStr || job.end).format("DD/MM/YYYY"),
                    ]}
                    locationPath={location.pathname}
                    pdLeft="30px"
                    pdRight="30px"
                    none__time={none__time}
                    // active={indexCardActive}
                  />
                </Link>
              </Grid>
            ))}
        </Grid>
      </div>
      {pathUrl !== `/information_company/${jobDetail?.id}` ? (
        <div className="button-card">
          <Link to={`/information_company/${jobDetail?.id}`}>
            <Button name="Xem thêm" bwidth="130px" bheight="40px"></Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

ContentBaseInformation.propTypes = {};

export default ContentBaseInformation;
