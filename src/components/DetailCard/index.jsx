import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppreciateByCompany } from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import { getJobByCompany } from "src/store/slices/main/home/job/jobSlice";
import Detail from "./component";
import "./styles.scss";

const DetailCard = ({
  jobDetail,
  jobList,
  candidate,
  jobPostHR,
  jobDetailById,
  demandPartner = false,
  jobListCompany,
}) => {
  const { appreciateList } = useSelector((state) => state.appreciate);
  const dispatch = useDispatch();
  useEffect(() => {
    let idCompany =
      jobDetail?.universityDTO?.id ||
      jobDetail?.hr?.company?.id ||
      jobDetail?.jobApp?.hr?.company?.id;
    dispatch(getAppreciateByCompany(idCompany));
    dispatch(getJobByCompany(idCompany));
  }, [
    dispatch,
    jobDetail?.hr?.company?.id,
    jobDetail?.jobApp?.hr?.company?.id,
    jobDetail?.universityDTO?.id,
  ]);

  const data = [appreciateList?.map((item) => {
    return item?.score;
  })]
  console.log(appreciateList)
  const res = data?.reduce((total, currentValue) => {
    return total + currentValue;
  }, 0);
  const rating = (res / data?.length).toFixed(2);

  return (
    <div>
      {jobList && jobList.length > 0 ? (
        <Detail
          jobDetail={jobDetail}
          demandPartner={demandPartner}
          rating={rating}
          jobListCompany={jobListCompany}
          jobDetailById={jobDetailById}
        />
      ) : (
        (
          <Detail demandPartner={demandPartner} jobDetailById={jobDetailById} />
        ) || null
      )}
    </div>
  );
};

DetailCard.propTypes = {
  logo: PropTypes.string.isRequired,
  nameMajor: PropTypes.string,
  nameCompany: PropTypes.string,
  detailJob: PropTypes.string,
  requireJob: PropTypes.string,
  timeJob: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DetailCard;
