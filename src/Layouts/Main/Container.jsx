import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobApplyListByCandidate,
  getJobCareByCandidate,
} from "src/store/slices/main/home/job/jobCandidateSlice";
const Container = ({ children }) => {
  // Nếu nguời dừng có quyền Candidate . sau khi login sẽ đuợc components này xử lí. đem dispatch và lấy job quan tâm và job apply.
  // Các  component khác chỉ cần gọi và dùng. Không dípatch nữa. đây là component cha

  const { user} = useSelector((state) => state.profile);
  const { page : pageNo  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    const userStorage =
      JSON.parse(sessionStorage.getItem("userPresent")) ||
      JSON.parse(localStorage.getItem("userPresent"));
    const page = {
      user: user,
      token: userStorage?.token,
      page: {
        no: pageNo - 1,
        limit: 5,
      },
    };
    user &&
      user.user?.role?.name === "Role_Candidate" &&
      userStorage &&
      dispatch(getJobApplyListByCandidate(page)) &&
      dispatch(getJobCareByCandidate(page));
  }, [dispatch, pageNo, user]);
  return <>{children}</>;
};

export default Container;
