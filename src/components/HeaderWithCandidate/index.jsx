import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { indexFilterChange, pageFilterChange } from "src/store/slices/main/home/filter/filterSlices";
import './styles.scss';
export default function HeaderWithCandidate() {
  const location = useLocation()
  const path = location.pathname.slice(11,100)
  const dispatch = useDispatch()
  const handleClick = () => {
    window.scrollTo({ top : 0, left : 0, behavior : "smooth"})
    dispatch(indexFilterChange(0))
    dispatch(pageFilterChange(1));
  }
  return (
    <div className="header__hr">
      <Link to="/candidate/view-list-apply" onClick={()=>handleClick()} className={`${path === "view-list-apply" ? "active" : ""} header__hr-post`}>
        <PlaylistAddCheckOutlinedIcon fontSize="large" style={{color: "#00B074"}}/>
        <span className="header__hr-post-post">Công việc đã ứng tuyển</span>
      </Link>
      <Link to="/candidate/view-list-care" onClick={()=>handleClick()} className={`${path === "view-list-care" ? "active" : ""} header__hr-post`}>
        <FormatAlignJustifyIcon style={{color: "#00B074"}} />
        <span className="header__hr-post-post">Công việc đã quan tâm</span>
      </Link>
    </div>
  )
}
