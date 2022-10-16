import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import logoUser from "../../assets/img/Logo_user.png";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterChange } from "src/store/slices/main/candidate/user/userCandidateSlice";
import { indexFilterChange, pageFilterChange } from "src/store/slices/main/home/filter/filterSlices";

const Logo = ({ id }) => {
  const location = useLocation();
  const {role} = useSelector(state => state.profile)

  const navigate = useNavigate();
  const roleList = {
    3: "Ứng viên",
    1: "Nhà tuyển dụng",
    4: "Cộng tác viên",
  };
  const dispatch = useDispatch()
  const handleClickGoHome = async () => {
    if (
      location.pathname === "/" ||
      location.pathname === "/candidate" ||
      location.pathname === "/hr" ||
      location.pathname === "/partner"
    ) {
      return window.location.reload();
    }
    dispatch(indexFilterChange(0))
    dispatch(changeFilterChange(false));
    dispatch(pageFilterChange(1));
    if (role) {
      switch (role) {
        case "Role_HR":
          navigate(`/hr`, { replace: true });
          break;
        case "Role_Partner":
          navigate(`/partner`, { replace: true });
          break;
        case "Role_Candidate": {
          navigate(`/candidate`, { replace: true });
          break;
        }
        default:
          return navigate(`/`, { replace: true });
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="roleName__header" onClick={handleClickGoHome}>
      <Link to="#/" className="logo">
        <img src={logoUser} alt="" />
        <span>{id ? roleList[id] : ""}</span>
      </Link>
    </div>
  );
};

export default Logo;
