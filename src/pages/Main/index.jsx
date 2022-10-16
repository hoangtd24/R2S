import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import Home from "./Home";

const Main = () => {
    

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMajorList([1, 20]));
  }, [dispatch]);
  
  return (
    <Home
      demandPartner={false}
      linkFilter="/api/r2s/job/filter"
      nameSearch="công việc"
    ></Home>
  );
};

export default Main;
