import AddLocationIcon from "@mui/icons-material/AddLocation";
import WorkIcon from "@mui/icons-material/Work";
import { Icon, Typography } from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addApply } from "src/store/slices/main/candidate/apply/applySlice";
import { getAllJobApply } from "src/store/slices/main/home/job/jobCandidateSlice";
import Button from "../Button";
import "./styles.scss";

const InformationCompany = ({
  jobDetail,
  jobDetailById,
  rating,
  demandPartner = false,
}) => {
  const [check, setCheck] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const { allJobApply } = useSelector((state) => state.jobCandidateSlice);

  const dispatch = useDispatch();
  const handleAddJob = async (e) => {
    e.stopPropagation();
    if (user) {
      if (!user?.cv) {
        toast.error("Bạn chưa có CV, vui lòng cập nhật");
      } else {
        const applyData = {
          apply: JSON.stringify({
            jobApp: {
              id: jobDetail.id,
            },
            candidate: {
              id: user.id,
            },
            referenceLetter: `Đơn ứng tuyển ${user?.user?.username}`,
          }),
          fileCV: user.cv,
        };
        const resApply = await dispatch(addApply(applyData));
        if (
          resApply.payload.status === 200 ||
          resApply.payload.status === 201
        ) {
          toast.success("Đã nộp CV thành công");
          setCheck(true);
        }
      }
    } else {
      toast.error("Bạn cần đăng nhập với vai trò ứng viên để ứng tuyển");
    }
  };
  useEffect(() => {
    const userStorage =
      JSON.parse(sessionStorage.getItem("userPresent")) ||
      JSON.parse(localStorage.getItem("userPresent"));
    const dispatchJobApply = {
      user: user,
      token: userStorage?.token,
      page: {
        no: 0,
        limit: 1000,
      },
    };
    dispatch(getAllJobApply(dispatchJobApply));
  }, [dispatch, user]);
  useEffect(() => {
    setCheck(
      allJobApply
        ?.map((item) => {
          return item.jobApp?.id;
        })
        .includes(jobDetail?.id)
    );
  }, [jobDetail, allJobApply]);

  return (
    <div>
      {jobDetail && (
        <>
          <div className="detail__card-3">
            <Typography variant="span">
              <Typography
                variant="span"
                sx={{ fontSize: 16, color: "black", fontWeight: "700" }}
              >
                Mô tả công việc:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontSize: 16, fontWeight: "400" }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: jobDetail.desciption }}
                ></div>
              </Typography>
            </Typography>
            <Typography variant="span">
              <Typography
                variant="span"
                sx={{ fontSize: 16, color: "black", fontWeight: "700" }}
              >
                Yêu cầu công việc:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontSize: 14, fontWeight: "400" }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: jobDetail.requirement }}
                ></div>
              </Typography>
            </Typography>
            <div className="detail__card-3-item">
              <Typography variant="span">
                <Typography
                  variant="span"
                  sx={{ fontSize: 16, fontWeight: "700" }}
                >
                  Quyền lợi:
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontWeight: "400", fontSize: "14px !important" }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: jobDetail.otherInfo }}
                  ></div>
                </Typography>
              </Typography>
            </div>
            <div className="detail__card-3-item">
              <Typography variant="span">
                <Typography
                  variant="span"
                  sx={{ fontSize: 16, fontWeight: "700" }}
                >
                  Thời hạn ứng tuyển:
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  className="time-line"
                  sx={{ fontSize: "14px !important", fontWeight: "400" }}
                >
                  {moment(jobDetail.timeStartStr).format("DD/MM/YYYY")} -{" "}
                  {moment(jobDetail.timeEndStr).format("DD/MM/YYYY")}
                </Typography>
              </Typography>
            </div>
          </div>
          <div className="line"></div>
          <div className="detail__card-4">
            <div className="detail__card-4-item" sx={{ display: "flex" }}>
              <Icon className="detail__card-4-item-icon">
                <WorkIcon />
              </Icon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 14,
                  fontWeight: "400",
                  transform: "translate(5px,5px)",
                }}
              >
                {jobDetail.jobType?.name}
              </Typography>
            </div>
            <div className="detail__card-4-item">
              <AddLocationIcon className="detail__card-4-item-icon">
                <WorkIcon />
              </AddLocationIcon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 14,
                  fontWeight: "400",
                  transform: "translate(5px,5px)",
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {`${jobDetail.locationjob?.address}, ${jobDetail.locationjob?.district?.name}, ${jobDetail.locationjob?.district?.province?.name}`}
              </Typography>
            </div>
          </div>
          {user?.user?.role?.name === "Role_Candidate" ? (
            <div className="detail__card-5">
              <Button
                name={check ? "Đã Ứng Tuyển" : "Ứng Tuyển"}
                onClick={handleAddJob}
                disabled={check ? true : false}
                bheight="35px"
              ></Button>
            </div>
          ) : (
            ""
          )}
        </>
      )}
      {jobDetailById && (
        <>
          <div className="detail__card-3">
            <Typography variant="span">
              <Typography
                variant="span"
                sx={{ fontSize: 18, color: "black", fontWeight: "700" }}
              >
                {demandPartner ? "Bản tin tuyển dụng:" : "Mô tả công việc:"}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontSize: 16, fontWeight: "400" }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobDetailById.desciption,
                  }}
                ></div>
              </Typography>
            </Typography>
            <div className="detail__card-3-item">
              {demandPartner ? (
                <></>
              ) : (
                <Typography variant="span">
                  <Typography
                    variant="span"
                    sx={{ fontSize: 18, fontWeight: "700" }}
                  >
                    Yêu cầu công việc:
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{ fontSize: 16, fontWeight: "400" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobDetailById.requirement,
                      }}
                    ></div>
                  </Typography>
                </Typography>
              )}
            </div>
            <div className="detail__card-3-item">
              <Typography variant="span">
                <Typography
                  variant="span"
                  sx={{ fontSize: 18, fontWeight: "700" }}
                >
                  Thời hạn ứng tuyển:
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontSize: 17, fontWeight: "400" }}
                >
                  {moment(jobDetailById.timeStartStr).format("DD/MM/YYYY")} -{" "}
                  {moment(jobDetailById.timeEndStr).format("DD/MM/YYYY")}
                </Typography>
              </Typography>
            </div>
          </div>
          <div className="line"></div>
          <div className="detail__card-4">
            <div className="detail__card-4-item" sx={{ display: "flex" }}>
              <Icon className="detail__card-4-item-icon">
                <WorkIcon />
              </Icon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 17,
                  fontWeight: "400",
                  transform: "translate(5px,5px)",
                }}
              >
                {jobDetailById.jobType?.name}
              </Typography>
            </div>
            <div className="detail__card-4-item">
              <AddLocationIcon className="detail__card-4-item-icon">
                <WorkIcon />
              </AddLocationIcon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 14,
                  fontWeight: "400",
                  transform: "translate(5px,5px)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {`${jobDetailById.locationjob?.address} ${jobDetailById.locationjob?.district?.name}`}
              </Typography>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

InformationCompany.propTypes = {
  star: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  detailJob: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InformationCompany;
