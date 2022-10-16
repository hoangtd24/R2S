import { yupResolver } from "@hookform/resolvers/yup";
import WorkIcon from "@mui/icons-material/Work";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DescriptionForm from "src/components/DescriptionForm";
import InputFile from "src/components/InputFile";
import SelectMulti from "src/components/SelectMulti";
import Textarea from "src/components/Textarea";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import { getPartnerByUserID } from "src/store/slices/Admin/university/unversitySlice";
import {
  addDemand, getDemandById, updateDemand
} from "src/store/slices/main/home/demand/demandSlice";
import { getJobPositionList } from "src/store/slices/main/home/job/jobSlice";
import Button from "../../../components/Button";
import CustomInput from "../../../components/CustomInput/index";
import SelectCustom from "../../../components/Select";
import { SAMPLEFORM, schema } from "./handleForm";
import "./styles.scss";

const jobTypeList = [
  {
    id: 1,
    name: "Full time",
  },
  {
    id: 2,
    name: "Part time",
  },
  {
    id: 3,
    name: "Remote",
  },
];

const PostPartnerForm = ({ idDemand, isUpdate = false, setOpen }) => {
  const { majorList } = useSelector((state) => state.major);
  const { jobPosition } = useSelector((state) => state.job);
  const { status } = useSelector((state) => state.demand);
  const { activeUser } = useSelector((state) => state.university);
  const { demandDetail } = useSelector((state) => state.demand);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSample, setFormSample] = useState("");
  const [useSampleForm, setUseSampleForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idUser =
    JSON.parse(sessionStorage.getItem("userPresent"))?.ids ||
    JSON.parse(localStorage.getItem("userPresent"))?.ids;

  useEffect(() => {
    dispatch(getMajorList([1, 20]));
    dispatch(getJobPositionList());
    dispatch(getDemandById(idDemand));
    dispatch(getPartnerByUserID(idUser));
  }, [idUser, idDemand, dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleToggle = () => {
    setOpenForm(!openForm);
  };

  const handleUseForm = () => {
    setUseSampleForm(!useSampleForm);
    setFormSample(SAMPLEFORM);
  };

  async function editDemand({ idDemand, demandData }) {
    setLoading(true);
    try {
      await dispatch(updateDemand({ idDemand, demandData }));
      setOpen(false);
    } catch (error) {
      toast.error("Chỉnh sửa bài ứng tuyển không thành công");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (isUpdate) {
      setValue("jobName", demandDetail?.name);
      setValue("jobDescription", demandDetail?.desciption);
      setValue(
        "timeStart",
        demandDetail?.updateDate || demandDetail?.createDate
      );
      setValue("timeEnd", demandDetail?.end);
      setValue("amount", demandDetail?.amount);
    }
  }, []);
  const onSubmit = (data) => {
    const demandData = {
      demand: JSON.stringify({
        name: data.jobName,
        description: data.jobDescription,
        requirement: "",
        ortherInfo: "",
        startStr: moment(data.timeStart).format("YYYY-MM-DD"),
        endStr: moment(data.timeEnd).format("YYYY-MM-DD"),
        partner: {
          id: parseInt(activeUser?.id),
        },
        major: [data.major],
        position: {
          id: parseInt(data.jobPosition) || null,
        },
        jobType: {
          id: parseInt(data.jobType) || null,
        },
        amount: parseInt(data.amount),
      }),
      fileSV: data.fileSV,
    };
    const user =
      JSON.parse(sessionStorage.getItem("userPresent")) ||
      JSON.parse(localStorage.getItem("userPresent"));
    dispatch(addDemand([demandData, user]));
  };

  if (status === "success") {
    navigate("/partner/post-list");
  }
  return (
    <>
      <div className="partner-post__container">
        <div className="form__container">
          <div className="partner-post__form">
            <div className="partner-post__heading">
              <WorkIcon />
              <h2>Đợt thực tập của trường</h2>
            </div>
            <p className="title-requirement">
              (<span className="field-requirment"> * </span>)Trường bắt buộc
            </p>
            <div className="partner-post-title">
              <CustomInput
                label="Tên công việc"
                id="jobName"
                value="test"
                height={50}
                type="text"
                placeholder="Thực tập thiết kế UI-UX..."
                register={register}
              >
                {errors.jobName?.message}
              </CustomInput>
            </div>
            <div className="row-2-col">
              <div className="partner-post__select">
                <SelectCustom
                  id="jobPosition"
                  label="Vị trí công việc"
                  placeholder="Vui lòng chọn..."
                  options={jobPosition}
                  register={register}
                  requirementField={false}
                >
                  {errors.jobPosition?.message}
                </SelectCustom>
              </div>
              <div className="partner-post__select">
                <SelectMulti
                  id="major"
                  arrList={majorList}
                  register={register}
                  placeholder="Vui lòng chọn..."
                  label="Chuyên ngành"
                >
                  {errors.major?.message}
                </SelectMulti>
              </div>
            </div>
            <div className="row-2-col">
              <div className="partner-post__select">
                <SelectCustom
                  id="jobType"
                  label="Hình thức làm việc"
                  placeholder="Vui lòng chọn..."
                  defaultValue={demandDetail?.jobType?.id}
                  options={jobTypeList}
                  register={register}
                  requirementField={false}
                >
                  {errors.jobType?.message}
                </SelectCustom>
              </div>
              <CustomInput
                label="Số lượng ứng viên"
                id="amount"
                type="number"
                placeholder="Nhập số lượng..."
                register={register}
              >
                {errors.amount?.message}
              </CustomInput>
            </div>
            <div className="row-2-col">
              <CustomInput
                label="Ngày bắt đầu ứng tuyển"
                id="timeStart"
                type="date"
                placeholder=""
                register={register}
              >
                {errors.timeStart?.message}
              </CustomInput>

              <CustomInput
                label="Ngày hết hạn ứng tuyển"
                id="timeEnd"
                type="date"
                placeholder=""
                register={register}
              >
                {errors.timeEnd?.message}
              </CustomInput>
            </div>
            <div className="partner-post__textarea-description">
              <Textarea
                label="Thư giới thiệu"
                id="jobDescription"
                type="description"
                placeholder="Thư giới thiệu..."
                defaultValue={useSampleForm ? formSample : ""}
                register={register}
                setValue={setValue}
              >
                {errors.jobDescription?.message}
              </Textarea>

              <div className="description-btn-post-partner-container">
                <button
                  className="description-btn-post-partner"
                  onClick={handleToggle}
                >
                  {openForm === false ? "(Xem thư mẫu)" : "(Đóng)"}
                </button>
              </div>
              {openForm && (
                <div className="descriptionForm__partner">
                  <DescriptionForm
                    schoolName={activeUser?.universityDTO?.name}
                  />

                  <div className="description-confirm-sample-btn-container">
                    <button
                      onClick={handleUseForm}
                      className="description-confirm-sample-btn"
                    >
                      {!useSampleForm
                        ? "Sử dụng mẫu này"
                        : "Không dùng thư mẫu"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="partner-post__textarea">
              <InputFile
                label="Danh sách sinh viên"
                requirementField={true}
                format="excel"
                id="fileSV"
                setValue={setValue}
                register={register}
              >
                {errors.fileSV?.message}
              </InputFile>
            </div>
            <div className="partner-post__action">
              <Button
                onClick={handleSubmit(onSubmit)}
                name={isUpdate ? "Chỉnh sửa" : "Đăng tuyển"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPartnerForm;
