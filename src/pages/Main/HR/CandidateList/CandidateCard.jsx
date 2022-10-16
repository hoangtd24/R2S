import React, { useState } from "react";
import "./styles.scss";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ButtonMark from "src/components/ButtonMark";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { toast } from "react-toastify";
const BASEURL = process.env.REACT_APP_API;
export const CandidateCard = ({
  avatar = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
  candidate,
}) => {
  const [click, setClick] = useState(true);
  const [open, setOpen] = useState(false);
  const [numberCV, setNumberCV] = useState([]);
  const viewProfileCV = (info) => {
    setOpen(!open);
    setNumberCV(info.cv);
  };

  const renderCV = () => {
    return (
      <Modal
        iconClose={true}
        modalTitle="Xem CV Ứng Viên"
        open={open}
        setOpen={setOpen}
        children={
          <div style={{ width: "100%", height: "100%", padding: "2rem 4rem" }}>
            <div
              onClick={() => setOpen(!open)}
              style={{
                cursor: "pointer",
                float: "right",
                border: "1px solid #ccc",
                padding: "4px 8px",
                backgroundColor: "#fff",
                outline: "none",
                borderRadius: "5px",
              }}
            >
              <CloseIcon />
            </div>
            {/* <embed
              src={numberCV}
              width="100%"
              height="100%"
              type="application/pdf"
            ></embed> */}

            <iframe
              src={`https://docs.google.com/gview?url=${numberCV}&embedded=true`}
              width="100%"
              height="100%"
              frameborder="1"
              title="cv"
            ></iframe>
          </div>
        }
      />
    );
  };
  const addFavorite = (e) => {
    setClick(!click);
    // eslint-disable-next-line no-lone-blocks
    {
      click
        ? toast.success("Đã thêm ứng viên vào yêu thích")
        : toast.warning("Xóa ứng viên khỏi yêu thích");
    }
  };
  return (
    <>
      <div className="candidate-card__wrapper">
        <img
          src={candidate?.user?.avatar || avatar}
          alt="ảnh đại diện"
          className="candidate-card__avatar"
        />
        <div className="candidate-card__infor">
          <div className="row">
            <h2 className="candidate-card__infor-name">{`${candidate?.user?.lastName} ${candidate?.user?.firstName}`}</h2>
          </div>
          <p className="candidate-card__infor-item">
            <span>Chuyên ngành:</span>
            {`${candidate?.major?.name}`}
          </p>
          <p className="candidate-card__infor-item">
            <span>Số điện thoại:</span>
            {`${candidate?.user?.phone}`}
          </p>
          <p className="candidate-card__infor-item">
            <span>Email:</span>
            {`${candidate?.user?.email}`}
          </p>
        </div>
        <div className="candidate-card__actions">
          <div
            className="view-button__wrapper"
            onClick={() => viewProfileCV(candidate)}
          >
            <RemoveRedEyeIcon />
            <p>Xem CV</p>
          </div>
          <div style={{ display: "none" }}>
            <ButtonMark border="1px solid #DEDEDE" />
          </div>
          <div
            onClick={() => addFavorite()}
            style={{
              border: "1px solid #DEDEDE",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#000",
            }}
          >
            {click ? <BookmarkBorderIcon /> : <BookmarkIcon />}
          </div>
        </div>
        <p className="candidate-card__infor-time">
          <AccessTimeIcon />
          09/06/2022
        </p>
        {renderCV()}
      </div>
    </>
  );
};

export default CandidateCard;
