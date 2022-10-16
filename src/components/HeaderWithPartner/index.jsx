import AddCardIcon from "@mui/icons-material/AddCard";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { indexFilterChange, pageFilterChange } from "src/store/slices/main/home/filter/filterSlices";
import SearchResultHome from "../SearchResultHome";
import "./styles.scss";

function HeaderWithPartner(props) {
  const dispatch = useDispatch()
  const handleClick = () => {
    window.scrollTo({ top : 0, left : 0, behavior : "smooth"})
    dispatch(indexFilterChange(0))
    dispatch(pageFilterChange(1));
  }
  return (
    <>
      <div className="header__partner">
        <Link onClick={()=>{ window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}} to="/partner/post" className="header__partner-post">
          <AddCardIcon sx={{ color: "#04bf8a" }}></AddCardIcon>
          <span className="header__partner-post-post">Đăng bài</span>
        </Link>
        <Link onClick={()=>handleClick()} to="/partner/post-list" className="header__partner-post">
          <FormatAlignJustifyIcon
            sx={{ color: "#04bf8a" }}
          ></FormatAlignJustifyIcon>
          <span className="header__partner-post-post">
            Danh sách các đợt thực tập
          </span>
        </Link>
      </div>
      {props.search ? (
        <SearchResultHome
          bwidth="681px"
          bheight="33px"
          bwidthInput="fit-content"
          bheightInput="fit-content"
          mb="0"
          candidate_infomation={true}
        />
      ) : null}
    </>
  );
}

HeaderWithPartner.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithPartner;
