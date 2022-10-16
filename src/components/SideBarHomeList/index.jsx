import React, { useEffect, useState } from "react";
import "./styles.scss";
import ListCollapse from "../ListCollapse";

import { useDispatch, useSelector } from "react-redux";
import { getMajorList } from "../../store/slices/Admin/major/majorSlice";
import { getJobPositionList } from "../../store/slices/main/home/job/jobSlice";

const listWorkingFormat = [
  { name: "Fulltime", id: 1 },
  { name: "Parttime", id: 2 },
  { name: "Remote", id: 3 },
];

const SideBarHomeList = ({ onChange, slideBarHome__wrapper = false }) => {
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const { jobPosition } = useSelector((state) => state.job);
  const [checkedType, setCheckedType] = useState([]);

  useEffect(() => {
    dispatch(getMajorList([1, 20]));
    dispatch(getJobPositionList());
  }, [dispatch]);

  const handleCheckType = (valueName, valueCheck) => {
    var updatedList = [...checkedType];
    if (valueCheck) {
      updatedList = [...checkedType, valueName];
    } else {
      updatedList.splice(checkedType.indexOf(valueName), 1);
    }
    setCheckedType(updatedList);
    onChange && onChange(updatedList);
  };

  const handleCheckPosition = (valueName, valueCheck) => {
    var updatedList = [...checkedType];
    if (valueCheck) {
      updatedList = [...checkedType, valueName];
    } else {
      updatedList.splice(checkedType.indexOf(valueName), 1);
    }
    setCheckedType(updatedList);
    onChange && onChange(updatedList);
  };

  const handleCheckMajor = (valueName, valueCheck) => {
    var updatedList = [...checkedType];
    if (valueCheck) {
      updatedList = [...checkedType, valueName];
    } else {
      updatedList.splice(checkedType.indexOf(valueName), 1);
    }
    setCheckedType(updatedList);
    onChange && onChange(updatedList);
  };
  return (
    <div className={slideBarHome__wrapper ? `slideBarHome__wrapper` : ""}>
      <ListCollapse
        title="Hình thức làm việc"
        list={listWorkingFormat}
        spacing={3}
        onChange={handleCheckType}
      />
      <ListCollapse
        title="Vị trí làm việc"
        list={jobPosition}
        spacing={3}
        name="POSITIONJOBS"
        onChange={handleCheckPosition}
      />
      <ListCollapse
        title="Chuyên ngành"
        list={majorList}
        spacing={3}
        name="MAJORJOBS"
        onChange={handleCheckMajor}
      />
    </div>
  );
};

export default SideBarHomeList;
