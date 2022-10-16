import "./styles.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import CachedIcon from "@mui/icons-material/Cached";
import PostStatus from "../PostStatus";
import ButtonAction from "../ButtonAction";
import moment from "moment";
import { useRef, useState } from "react";
import Modal from "../Modal";
import CandidateList from "src/pages/Main/HR/CandidateList";
import PostJobForm from "src/containers/Home/PostJobForm";
import Confirmation from "../Confirmation";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusJob } from "src/store/slices/main/home/job/jobSlice";
import PostPartnerForm from "src/containers/Home/PostPartnerForm";

const CardPost = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState(<CandidateList />);
  const [title, setTitle] = useState("");
  const action = useRef("");
  const { jobListActived, jobListDisabled } = useSelector((state) => state.job);
  const jobList = jobListActived.concat(jobListDisabled);
  const jobDetail = jobList.filter((job) => {
    if(job) {
      return job.id === props.idJob;
    }
  });

  const update = () => {
    action.current = "update";
  };
  const read = () => {
    action.current = "read";
  };
  const close = () => {
    action.current = "close";
  };

  const handleCloseJob = () => {
    const jobData = {
      status: {
        id: 4,
      },
    };
    const token = JSON.parse(sessionStorage.getItem("userPresent"))?.token ||
   JSON.parse(localStorage.getItem("userPresent"))?.token
    dispatch(updateStatusJob([props.idDemand, jobData, token]));
    setOpen(false);
  };

  const handleOnClick = () => {
    if (props.isDemandPost) {
      switch (action.current) {
        case "update":
          setComponent(
            <PostPartnerForm
              idDemand={props.idDemand}
              isUpdate={true}
              setOpen={setOpen}
            />
          );
          setTitle("Chỉnh sửa thông tin đợt thực tập");
          break;
        case "close":
          setComponent(
            <Confirmation
              setOpen={setOpen}
              text="Bạn có chắc muốn đóng việc?"
              nameBtnYes="Đóng việc"
              nameBtnNo="Hủy"
              func={handleCloseJob}
            />
          );
          setTitle("Đóng việc");
          break;
        default:
          setTitle("Danh sách ứng viên đã ứng tuyển");
          setComponent(<CandidateList idJob={props.idJob} />);
      }
      setOpen(true);
    } else {
      switch (action.current) {
        case "update":
          setComponent(
            props.isDisabled ? (
              ""
            ) : (
              <PostJobForm
                formStatus={"update"}
                jobDetail={jobDetail[0]}
                idJob={props.idJob}
                disabled={props.isDisabled}
                setOpen={setOpen}
              />
            )
          );
          setTitle("Chỉnh sửa thông tin đăng tuyển");
          break;
        case "close":
          setTitle(
            props.isDisabled ? "Chỉnh sửa thông tin đăng tuyển" : "Đóng việc"
          );
          setComponent(
            props.isDisabled ? (
              <PostJobForm
                formStatus={"repost"}
                jobDetail={jobDetail[0]}
                idJob={props.idJob}
                disabled={false}
                setOpen={setOpen}
              />
            ) : (
              <Confirmation
                image="https://cdn-icons-png.flaticon.com/512/1162/1162410.png"
                func={handleCloseJob}
                setOpen={setOpen}
                text="Bạn có chắc muốn đóng việc?"
                nameBtnYes="Đóng việc"
                // nameBtnNo="Hủy"
              />
            )
          );
          break;
        default:
          setTitle("Danh sách ứng viên đã ứng tuyển");
          setComponent(<CandidateList idJob={props.idJob} />);
      }
      setOpen(true);
    }
  };
  return (
    <div className="card-post__container">
      <PostStatus status={props.status?.id} />
      <h3 className="card-post__job-name">
        {props.jobName}
        {props.timeUpdated ? (
          <p className="card-post__created">
            <b>Ngày cập nhật:</b>{" "}
            {moment(props.timeUpdated).format("DD/MM/YYYY")}
          </p>
        ) : (
          <p className="card-post__created">
            <b>Ngày đăng:</b> {moment(props.timeCreated).format("DD/MM/YYYY")}
          </p>
        )}
      </h3>
      <div className="card-post__company-info-detail">
        <img
          className="company-info-detail__img"
          src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
          alt="Ảnh của công ty"
        />
        <div className="company-info-detail__content">
          <p className="company__name">{props.companyName}</p>
          <p className="company__location">{props.companyLocation}</p>
        </div>
      </div>
      <p className="card-post__time">
        <b>Thời gian tuyển dụng:</b>{" "}
        {moment(props.timeStart).format("DD/MM/YYYY")} -{" "}
        {moment(props.timeEnd).format("DD/MM/YYYY")}
      </p>

      <div className="card-post__action">
        <ButtonAction
          onClick={handleOnClick}
          onMouseEnter={read}
          height="50px"
          amountApplications={props.amountApplications}
          amountDemands={!props.isDemandPost ? props.amount : ""}
          width="33.33%"
          borderTop="0.5px solid #DEDEDE"
          borderRight="0.5px solid #DEDEDE"
          borderBottom="0.5px solid #DEDEDE"
          icon={<PersonOutlineIcon></PersonOutlineIcon>}
          color="#111"
          name={props.isDemandPost ? "Ứng tuyển" : "Ứng viên"}
          fontSize="13px"
          type="read"
        />
        <ButtonAction
          onClick={handleOnClick}
          onMouseEnter={update}
          height="50px"
          width="33.33%"
          borderTop="0.5px solid #DEDEDE"
          borderRight="0.5px solid #DEDEDE"
          borderBottom="0.5px solid #DEDEDE"
          icon={<ModeEditOutlineIcon></ModeEditOutlineIcon>}
          color="#111"
          name="Chỉnh sửa"
          fontSize="13px"
          type="update"
          disabled={props.isDisabled && true}
        />
        <ButtonAction
          onClick={handleOnClick}
          onMouseEnter={close}
          height="50px"
          width="33.33%"
          borderTop="0.5px solid #DEDEDE"
          borderBottom="0.5px solid #DEDEDE"
          icon={props.isDisabled ? <CachedIcon /> : <DoorFrontIcon />}
          color="#111"
          name={props.isDisabled ? "Đăng lại" : "Đóng"}
          fontSize="13px"
          type="close"
        />
      </div>
      <Modal
        modalTitle={title}
        name="list-candidate"
        className="card-post__modal"
        open={open}
        setOpen={setOpen}
        iconClose={true}
      >
        {component}
      </Modal>
    </div>
  );
};

export default CardPost;
