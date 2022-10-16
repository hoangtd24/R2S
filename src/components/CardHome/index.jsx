import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import PeopleIcon from "@mui/icons-material/People";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { Tooltip } from "@mui/material";
import Rating from "@mui/material/Rating";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  idFilterChange,
  indexFilterChange,
} from "src/store/slices/main/home/filter/filterSlices";
import { getAllJobCare } from "src/store/slices/main/home/job/jobCandidateSlice";
import ButtonMark from "../ButtonMark";
import TagName from "../TagName";
import "./styles.scss";

const CardHome = (props) => {
  const dispatch = useDispatch();
  const [isMarkLength, setIsMarkLength] = useState();
  const { allJobCare } = useSelector((state) => state.jobCandidateSlice);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const handleClick = () => {
    if (window.innerWidth < 1199) {
      navigate(`/detail_job/${props.id}`);
    }
    dispatch(indexFilterChange(props.index));
    dispatch(idFilterChange(props.idCompany));
  };
  useEffect(() => {
    const userStorage =
      JSON.parse(sessionStorage.getItem("userPresent")) ||
      JSON.parse(localStorage.getItem("userPresent"));
    const dispatchJobCAre = {
      user: user,
      token: userStorage?.token,
      page: {
        no: 0,
        limit: 1000,
      },
    };
    dispatch(getAllJobCare(dispatchJobCAre));
  }, [dispatch, user]);

  useEffect(() => {
    let isMark = allJobCare.filter((job) => job?.jobCare?.id === props?.id);
    setIsMarkLength(isMark.length > 0 ? true : false);
  }, [allJobCare, props?.id]);
  return (
    <div
      onClick={handleClick}
      className={clsx(
        "cardHome__container",
        props.active === props.index ? "active" : ""
      )}
      style={{
        paddingLeft: props.pdLeft ? props.pdLeft : "",
        paddingRight: props.pdRight ? props.pdRight : "",
      }}
    >
      <div className="cardHome__col1" dataset={props.id}>
        <div className="cardHome__aboutCompany">
          <img
            className="cardHome__img"
            src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
            alt=""
          />
          <div style={{ textAlign: "left" }}>
            <Tooltip title={props.title} placement="top">
              <h4 className="cardHome__title">{props.title}</h4>
            </Tooltip>
            <p className="cardHome__nameCompany">{props.nameCompany}</p>
          </div>
        </div>
        <div className="cardHome__tagName">
          {props.tagName.map((tag) => (
            <TagName key={tag} title={tag} />
          ))}
        </div>
        {props.demandPartner ? (
          <div className="cardHome__amount-hr-apply">
            <PeopleIcon sx={{ color: "#04bf8a !important" }} />
            <span className="amount">Số lượng ứng viên: {props.amount}</span>
          </div>
        ) : (
          <Rating
            name="read-only"
            precision={0.5}
            readOnly
            value={props.star ?? " "}
          />
        )}
      </div>

      <div className="cardHome__col2">
        {props.hiddent ? (
          <div style={{ visibility: "hidden" }}>
            <ButtonMark
              height="32px"
              width="32px"
              fontSize="18px"
              jobId={props.id}
              isMark={false}
            />
          </div>
        ) : (
          <>
            {user?.user?.role?.name?.includes("Role_Candidate") ? (
              <ButtonMark
                height="32px"
                width="32px"
                fontSize="18px"
                jobId={props.id}
                isMark={isMarkLength}
              />
            ) : (
              <div style={{ visibility: "hidden" }}>
                <ButtonMark
                  height="32px"
                  width="32px"
                  fontSize="18px"
                  jobId={props.id}
                  isMark={false}
                />
              </div>
            )}
          </>
        )}
        {props.none__time ? (
          <div className="cardHome__col2-End-1">
            <AddLocationAltRoundedIcon
              style={{ fontSize: `${props.fontSize + 2}px` }}
              sx={{ color: "#04bf8a" }}
            />

            <p
              style={{
                fontSize: `${props.fontSize}px`,
                width: "max-content",
                color: "#000",
              }}
            >
              {props.location}
            </p>
          </div>
        ) : (
          <div className="cardHome__col2-End">
            <div className="cardHome__col2-End-1">
              <AddLocationAltRoundedIcon
                style={{ fontSize: `${props.fontSize + 2}px` }}
              />
              <p style={{ fontSize: `${props.fontSize}px`, color: "#000" }}>
                {props.location}
              </p>
            </div>
            <div className="cardHome__col2-End-2">
              <WatchLaterOutlinedIcon
                style={{ fontSize: `${props.fontSize + 2}px` }}
              />
              <p
                style={{ fontSize: `${props.fontSize}px` }}
              >{`${props.time[0]} - ${props.time[1]}`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHome;
