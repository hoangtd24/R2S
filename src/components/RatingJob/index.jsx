import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { Rating } from "@mui/material";
import TagName from "../TagName";
import "./styles.scss";
const baseUrl = process.env.REACT_APP_API;
export default function RatingJob({ allRating }) {
  const renderRating = () => {
    return allRating.slice(0, 4).map((item) => {
      return (
        <div className="cardHome__container">
          <div className="cardHome__col1">
            <div className="cardHome__aboutCompany">
              <img
                style={{ borderRadius: "50%" }}
                className="cardHome__img"
                src={`${baseUrl}${item.company?.logo}`}
                alt=""
                onerror="this.onerror=null;this.src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';"
              />
              <div style={{ textAlign: "left" }}>
                <h4 className="cardHome__title">{item.company?.name}</h4>
                <p className="cardHome__nameCompany">{item.company?.website}</p>
              </div>
            </div>
            <div className="cardHome__tagName">
              <TagName title={item.title} />
              <TagName title={item.comment} />
            </div>
          </div>

          <div className="cardHome__col2">
            <div>
              <Rating name="read-only" value={item.score} readOnly />
            </div>
            <div className="cardHome__col2-End">
              <div className="cardHome__col2-End-1">
                <AddLocationAltRoundedIcon
                  style={{ fontSize: `${12 + 2}px` }}
                />
                <p style={{ fontSize: `${14}px`, color: "#000" }}>
                  {item.user === null ? "Ẩn Danh" : item.user.username}
                </p>
              </div>
              <div className="cardHome__col2-End-2">
                <WatchLaterOutlinedIcon style={{ fontSize: `${12 + 2}px` }} />
                <p style={{ fontSize: `${14}px` }}>{item.createDate}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return <div>{renderRating()}</div>;
}
