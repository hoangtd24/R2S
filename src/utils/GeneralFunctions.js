import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setISRigthAuth } from "src/store/slices/main/home/global/globalSlices";

export const TabTitle = (newTitle) => {
  return (document.title = newTitle);
};
export const AuthenticationPathUrl = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathUrl = location.pathname;
  const roleUser = JSON.parse(sessionStorage.getItem("userPresent"))?.role ||
   JSON.parse(localStorage.getItem("userPresent"))?.role;
  const { isRightAuth } = useSelector((state) => state.globalSlices);


  let role;
  if (roleUser) {
    switch (roleUser) {
      case "Role_HR":
        role = "hr";
        break;
      case "Role_Partner":
        role = "partner";
        break;
      case "Role_Candidate":
        role = "candidate";
        break;
      default:
        role = "admin";
    }
    if (!pathUrl.includes(role) && pathUrl !== "/not-found") {
      dispatch(setISRigthAuth(false));
    }
  } else {
    if (
      (pathUrl.includes("hr") ||
        pathUrl.includes("partner") ||
        pathUrl.includes("candidate") ||
        pathUrl.includes("admin")) &&
      !pathUrl.includes("register") &&
      !pathUrl.includes("loginadmin")
    ) {
      dispatch(setISRigthAuth(false));
    }
  }
  if (!isRightAuth) {
    navigate("/not-found", { replace: true });
    dispatch(setISRigthAuth(true));
  }
};

