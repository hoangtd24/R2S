import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { IconButton, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteAppreciate,
  getAppreciateByCompany,
  updateAppreciate
} from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import ButtonCustom from "../Button";
import CustomCheckbox from "../CustomCheckbox";
import CustomInput from "../CustomInput";
import Modal from "../Modal";
import Textarea from "../Textarea";
import "./styles.scss";
import { schema } from "./validate";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.2),
}));

const getLabelText = (value) => {
  // return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};
const Appreciate = ({ appreciate, fontSize }) => {
  const value = appreciate?.score;
  const nameUser = "Ẩn danh";
  var checked = false;
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const [valueRating, setValueRating] = useState(appreciate?.score);
  const [hover, setHover] = useState(-1);
  const [like, setLike] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { jobDetail } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const idCompany = jobDetail?.hr?.company.id;
  useEffect(() => {
    setValue("title", appreciate?.title);
    setValue("comment", appreciate?.comment);
    setValue("size-medium", appreciate?.score);
    setValue("isCheck", appreciate?.hide);
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCheck = (e) => {
    const check = e.target.checked;
    checked = check;
  };
  const onSubmit = async (data) => {
    const dataUpdate = {
      id: appreciate.id,
      avaluateData: {
        title: data.title,
        comment: data.comment,
        score: valueRating,
        hide: checked,
        createDate : appreciate.createDate
      },
    };

    try {
      const res = await dispatch(updateAppreciate(dataUpdate));
      await dispatch(getAppreciateByCompany(idCompany));
      if (res.payload.status === 200) {
        toast.success("Đã đăng đánh giá");
      } else {
        toast.error(
          "Có lỗi hoặc bạn đã từng đăng đánh giá, vui lòng kiểm tra lại"
        );
      }
    } catch (error) {
      // if (error.status === 400) {
      //   for (const key in error.data) {
      //     setError(key, {
      //       type: "server",
      //       message: error.data[key],
      //     });
      //   }
      // }
    }

    reset();
    setOpen(false);
  };
  const handleDeleteAppreciate = async (e) => {
    e.stopPropagation();
    await dispatch(deleteAppreciate(appreciate.id)).then(
      toast.success("Đã xóa đánh giá ")
    );
    await dispatch(getAppreciateByCompany(idCompany));
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickLike = () => {
    setLike(!like);
  };

  const openAnchorEl = Boolean(anchorEl);
  // const id = openAnchorEl ? "simple-popover" : undefined;
  return (
    <Box
      sx={{
        width: "100%",
        mb: 1,
        borderRadius: 10,
      }}
    >
      <Stack sx={{}}>
        <Item
          elevation={0}
          sx={{}}
          className={
            appreciate?.user?.username === user?.user?.username
              ? "appreciate__active"
              : ""
          }
        >
          <div className="appreciate" style={{}}>
            <div className="fix_display">
              <img
                className=""
                alt=""
                src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
                style={{}}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  flexDirection: "column",
                }}
              >
                <div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ fontSize: 16 }}
                        >
                          {(appreciate?.hide === true && nameUser) ||
                            appreciate?.user?.username || "Ẩn danh"}
                        </Typography>
                      </div>
                      <div
                        style={{
                          // marginBottom: 10,
                          transform: "translate(0px,4px)",
                        }}
                      >
                        <Rating
                          name="text-feedback"
                          value={value}
                          readOnly
                          precision={0.5}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                          sx={{ fontSize: 18 }}
                        />
                      </div>
                    </div>

                    <Typography
                      sx={{
                        fontSize: 16,
                        // transform: "translate(0,-10px)",
                        display: "flex",
                        wordBreak: "break-word",
                        textAlign: "initial",
                        fontWeight: "400",
                      }}
                    >
                      {/* {`${appreciate?.comment?.slice(
                    3,
                    appreciate?.comment?.length - 4
                  )}` || ""} */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: appreciate?.comment,
                        }}
                      ></div>
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "start",
                  }}
                >
                  <Tooltip title="Thích đánh giá">
                    <IconButton
                      style={{
                        borderRadius: "4px",
                      }}
                      aria-label="like"
                      className="buttonMark__wrapper"
                      onClick={handleClickLike}
                    >
                      {like === false ? (
                        <ThumbUpOutlinedIcon
                          fontSize="small"
                          className="buttonMark__isChecking"
                          style={{ fontSize: "17px" }}
                        />
                      ) : (
                        <ThumbUpIcon
                          fontSize="small"
                          className="buttonMark__isChecking"
                          style={{ fontSize: "17px" }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: fontSize ? fontSize : "",
              }}
            >
              <h6>{appreciate?.createDate}</h6>
              <div className="">
                <div
                  className=""
                  style={{
                    marginTop: "25px",
                  }}
                >
                  {appreciate?.user?.username === user?.user?.username && (
                    <div className="">
                      <div>
                        {" "}
                        <Tooltip title="Chỉnh sửa" onClick={handleOpen}>
                          <IconButton>
                            <EditOutlinedIcon
                              sx={{ fontSize: "20px", color: "#04bf8a" }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa" onClick={handleDeleteAppreciate}>
                          <IconButton>
                            <DeleteIcon
                              color=""
                              sx={{ fontSize: "20px", color: "#04bf8a" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Item>
        <Modal
          iconClose={true}
          modalTitle="Sửa đánh giá "
          open={open}
          setOpen={setOpen}
          children={
            <div>
              <CustomInput
                label="Sửa tiêu đề "
                id="title"
                type="text"
                placeholder="Rất tuyệt..."
                register={register}
                requirementField={false}
                setValue={setValue}
                height="50px"
                border="1px solid black"
              />
              <Textarea
                label="Sửa đánh giá "
                id="comment"
                placeholder="Nhập vào đây..."
                register={register}
                defaultValue={appreciate?.comment}
                setValue={setValue}
                check={true}
                hover="1px solid green"
              >
                {errors.comment?.message}
              </Textarea>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="size-medium"
                  defaultValue={valueRating}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValueRating(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  sx={{
                    fontSize: "20px",
                    color: "yellow",
                  }}
                  size="large"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {valueRating !== null && (
                  <Box sx={{ ml: 2 }}>
                    {/* {labels[hover !== -1 ? hover : valueRating]} */}
                  </Box>
                )}
              </Box>
              <div onChange={handleCheck}>
                <CustomCheckbox key="1" label="Ẩn danh" />
              </div>
              <ButtonCustom
                onClick={handleSubmit(onSubmit)}
                name="Đăng đánh giá"
              />
            </div>
          }
          name="list-candidate"
        />
      </Stack>
    </Box>
  );
};

Appreciate.propTypes = {};

export default Appreciate;
