import React, { useEffect } from "react";
import BaseInformationCompany from "src/components/BaseInformationCompany";
import { useSelector, useDispatch } from "react-redux";
import {
  getJobByCompany,
  getJobById,
  getJobList,
} from "src/store/slices/main/home/job/jobSlice";
import "./styles.scss";
import { TabTitle } from "src/utils/GeneralFunctions";
import { getAppreciateByCompany } from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import { useParams } from "react-router-dom";

const CandidateInformationCompany = () => {
  TabTitle("Thông tin Công ty");

  const { appreciateList } = useSelector((state) => state.appreciate);
  const { jobDetailById, jobListCompany } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const idCompany = jobDetailById?.hr?.company.id;

  useEffect(() => {
    dispatch(getJobById(keyword));
    dispatch(getJobByCompany(idCompany));
  }, [dispatch,keyword,idCompany]);
  useEffect(() => {
    dispatch(getAppreciateByCompany(idCompany));
  }, [idCompany, dispatch]);

  useEffect(() => {
    dispatch(getJobList([1, 10]));
  }, [keyword, dispatch]);
  
  return (
    <div className="information-company__container">
      <BaseInformationCompany
        jobDetail={jobDetailById}
        information
        pl={0}
        pr={0}
        ml={0}
        pdLeft="130px"
        pdRight="130px"
        pdTop="3x"
        pdBottom="3px"
        appreciateList={appreciateList}
        jobListCompany={jobListCompany}
      />
    </div>
  );
};

export default CandidateInformationCompany;
