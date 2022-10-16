import React from "react";
import { useSelector } from "react-redux";
import Component from "./Component";
import SearchHR from "src/pages/Main/HR/SearchHR";

import { userCandidateRemainingSelector } from "src/store/slices/main/candidate/user/userCandidateRemaining";
import "./styles.scss";

const HrFindUser = () => {

  const userCandidate = useSelector(userCandidateRemainingSelector);

  return (
    <div className="hr_find_user-container">
      <SearchHR />
      <div className="hr_find_user-user">
        {userCandidate?.map((user) => {
          return <Component profile={user} />;
        })}
      </div>
    </div>
  );
};

export default HrFindUser;
