import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCandidateRemainingSelector } from "src/store/slices/main/candidate/user/userCandidateRemaining";
import { getAllUserCandidate } from "src/store/slices/main/candidate/user/userCandidateSlice";
import { getDemandList } from "src/store/slices/main/home/demand/demandSlice";
import Home from "../Home";

const HR = (props) => {
  const userCandidate = useSelector(userCandidateRemainingSelector);
  const { demandList, totalPagesofDemandList } = useSelector(
    (state) => state.demand
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserCandidate());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDemandList({ currentPage: 1, limit: 5 }));
  }, [dispatch]);
  return (
    <Home
      jobFilter={demandList}
      jobPage={totalPagesofDemandList}
      demandPartner={true}
      hr={true}
      userCandidate={userCandidate}
      linkFilter="/api/demand"
      nameSearch="bài đăng của truờng"
    />
  );
};

HR.propTypes = {};

export default HR;
