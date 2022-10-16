import "./styles.scss";
import WorkIcon from "@mui/icons-material/Work";
import CustomInput from "../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import "./styles.scss";
import "./responsive.scss";
import SwitchButton from "../../../components/SwitchButton";
import Button from "../../../components/Button";
import SelectCustom from "../../../components/Select";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import {
  addJob,
  getJobPositionList,
  updateJob,
} from "src/store/slices/main/home/job/jobSlice";
import {
  getDistrictList,
  getProvinceList,
} from "src/store/slices/location/locationSlice";
import { useNavigate } from "react-router-dom";
import Textarea from "src/components/Textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { schemaFormPost } from "./handleFormPost";
import { schemaFormRepost } from "./handleFormRepost";
import { schemaFormUpdate } from "./handleFormUpdate";

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

const countryList = [
  {
    id: 231,
    name: "Việt Nam",
  },
];

const PostJobForm = ({ formStatus, jobDetail, disabled = false, setOpen }) => {
  const { majorList } = useSelector((state) => state.major);
  const { provinceList, districtList } = useSelector((state) => state.location);
  const { jobPosition, status } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isNoSalary, setIsNoSalary] = useState(
    jobDetail ? jobDetail.salaryMax === 0 && true : false
  );
  useEffect(() => {
    dispatch(getMajorList([1, 20]));
    dispatch(getProvinceList());
    dispatch(getJobPositionList());
  }, [dispatch]);

  useEffect(() => {
    if (formStatus !== "post") {
      dispatch(getDistrictList(jobDetail?.locationjob?.district?.province?.id));
    }
  }, [dispatch, formStatus, jobDetail?.locationjob?.district?.province?.id]);

  useEffect(() => {
    if (formStatus !== "post") {
      setValue("name", jobDetail?.name);
      setValue("amount", jobDetail?.amount);
      setValue("address", jobDetail?.locationjob?.address);
      setValue(
        "salaryMin",
        jobDetail?.salaryMin === 0 ? null : jobDetail?.salaryMin
      );
      setValue(
        "salaryMax",
        jobDetail?.salaryMax === 0 ? null : jobDetail?.salaryMax
      );
      setValue("timeStart", jobDetail?.timeStartStr);
      setValue("timeEnd", jobDetail?.timeEndStr);
    }
  }, []);
  let schema;
  let textBtn;
  switch (formStatus) {
    case "update":
      let dateStart = new Date(jobDetail?.timeStartStr);
      dateStart = moment(dateStart).format("MM-DD-YYYY");
      sessionStorage.setItem("timeStart", dateStart);
      schema = schemaFormUpdate;
      textBtn = "Chỉnh sửa";
      break;
    case "repost":
      schema = schemaFormRepost;
      textBtn = "Đăng lại";
      break;
    default: //"post"
      schema = schemaFormPost;
      textBtn = "Đăng tuyển";
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChanged",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    if (formStatus === "post") {
      const jobData = {
        name: data.name,
        hr: {
          id: user?.id,
        },
        description: data.jobDescription,
        major: {
          id: parseInt(data.major),
        },
        jobType: {
          id: parseInt(data.jobType),
        },
        amount: parseInt(data.amount),
        salaryMin: isNoSalary ? 0 : data.salaryMin,
        salaryMax: isNoSalary ? 0 : data.salaryMax,
        requirement: data.jobRequirement,
        otherInfo: data.benefits,
        timeStartStr: moment(data.timeStart).format("YYYY-MM-DD"),
        timeEndStr: moment(data.timeEnd).format("YYYY-MM-DD"),
        jobposition: {
          id: data.jobPosition,
        },
        locationjob: {
          district: {
            id: data.district,
          },
          address: data.address,
        },
      };
      dispatch(addJob([jobData, "post"]));
    } else {
      const jobData = {
        name: data.name,
        hr: {
          id: user?.id,
        },
        description: data.jobDescription,
        major: {
          id: parseInt(data.major),
        },
        jobType: {
          id: parseInt(data.jobType),
        },
        amount: parseInt(data.amount),
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        requirement: data.jobRequirement,
        otherInfo: data.benefits,
        timeStartStr: moment(data.timeStart_update).format("YYYY-MM-DD"),
        timeEndStr: moment(data.timeEnd).format("YYYY-MM-DD"),
        createDate: jobDetail.createDate,
        jobposition: {
          id: parseInt(data.jobPosition),
        },
        locationjob: {
          id: jobDetail.locationjob.id,
          district: {
            id: parseInt(data.district),
            province: {
              id: parseInt(data.province),
              countries: {
                id: jobDetail?.locationjob?.district?.province?.countries?.id,
              },
            },
          },
          address: data.address,
        },
        status: {
          id: 1,
        },
      };
      if (formStatus === "repost") {
        dispatch(addJob([jobData, "repost"]));
      } else if (formStatus === "update") {
        const user =
          JSON.parse(sessionStorage.getItem("userPresent")) ||
          JSON.parse(localStorage.getItem("userPresent"));
        dispatch(updateJob([jobDetail.id, jobData, user]));
      }
      setOpen(false);
    }
  };
  if (formStatus !== "repost") {
    if (status === "success") {
      navigate("/hr/list");
    }
  }

  return (
    <>
      <form
        className="post-job-form"
        autoComplete="off"
        encType="multipart/form-data"
      >
        <div className="hr-post__container">
          <div className="form__container">
            <div className="hr-post__form">
              <div className="hr-post__heading">
                <WorkIcon style={{ margin: "5px 5px 0 0" }} />
                <h2 className="hr-post__title">Mô tả công việc</h2>
              </div>
              <p className="title-requirement">
                (<span className="field-requirment"> * </span>)Trường bắt buộc
              </p>
              <div className="hr-post-title">
                <CustomInput
                  label="Tên công việc"
                  id="name"
                  type="text"
                  placeholder="Thực tập thiết kế UI-UX..."
                  register={register}
                >
                  {errors.name?.message}
                </CustomInput>
              </div>
              <div className="row-2-col">
                <div className="hr-post__select">
                  <SelectCustom
                    id="jobType"
                    label="Hình thức làm việc"
                    placeholder="Vui lòng chọn..."
                    defaultValue={jobDetail?.jobType?.id}
                    options={jobTypeList}
                    register={register}
                  >
                    {errors.jobType?.message}
                  </SelectCustom>
                </div>
                <div className="hr-post__select">
                  <SelectCustom
                    id="major"
                    label="Chuyên ngành"
                    placeholder="Vui lòng chọn..."
                    defaultValue={jobDetail?.major?.id}
                    options={majorList}
                    register={register}
                  >
                    {errors.major?.message}
                  </SelectCustom>
                </div>
              </div>
              <div className="row-2-col">
                <div className="hr-post__select">
                  <SelectCustom
                    id="jobPosition"
                    label="Vị trí"
                    placeholder="Vui lòng chọn..."
                    defaultValue={jobDetail?.jobposition?.id}
                    options={jobPosition}
                    register={register}
                  >
                    {errors.jobPosition?.message}
                  </SelectCustom>
                </div>
                <CustomInput
                  label="Số lượng cần tuyển"
                  id="amount"
                  placeholder="Nhập số lượng..."
                  register={register}
                >
                  {errors.amount?.message}
                </CustomInput>
              </div>
              <div className="row-2-col">
                <CustomInput
                  label="Ngày bắt đầu tuyển"
                  id="timeStart"
                  type="date"
                  placeholder=""
                  register={register}
                >
                  {errors.timeStart?.message}
                </CustomInput>
                <CustomInput
                  label="Ngày hết hạn tuyển"
                  id="timeEnd"
                  type="date"
                  placeholder=""
                  register={register}
                >
                  {errors.timeEnd?.message}
                </CustomInput>
              </div>
              <div className={"row-3-col"}>
                <div className={"hr-post__select-location"}>
                  <SelectCustom
                    id="country"
                    label="Quốc gia"
                    placeholder="Vui lòng chọn..."
                    defaultValue={
                      jobDetail?.locationjob?.district?.province?.countries?.id
                    }
                    options={countryList}
                    register={register}
                  >
                    {errors.country?.message}
                  </SelectCustom>
                </div>
                <div className={"hr-post__select-location"}>
                  <SelectCustom
                    id="province"
                    label="Tỉnh/Thành phố"
                    placeholder="Vui lòng chọn..."
                    dispatch={dispatch}
                    defaultValue={
                      jobDetail?.locationjob?.district?.province?.id
                    }
                    action={getDistrictList}
                    options={provinceList}
                    register={register}
                  >
                    {errors.province?.message}
                  </SelectCustom>
                </div>
                <div className={"hr-post__select-location"}>
                  <SelectCustom
                    id="district"
                    label="Quận/Huyện"
                    placeholder="Vui lòng chọn..."
                    defaultValue={jobDetail?.locationjob?.district?.id}
                    options={districtList}
                    register={register}
                  >
                    {errors.district?.message}
                  </SelectCustom>
                </div>
              </div>
              <div className={"hr-post__select"}>
                <CustomInput
                  label="Địa chỉ"
                  id="address"
                  type="text"
                  placeholder="254, Dương Đình Hội..."
                  register={register}
                >
                  {errors.address?.message}
                </CustomInput>
              </div>
              <div className="hr-post__textarea">
                <Textarea
                  label="Mô tả công việc"
                  id="jobDescription"
                  placeholder="Nhập mô tả công việc..."
                  defaultValue={
                    formStatus !== "post" ? jobDetail?.description : ""
                  }
                  setValue={setValue}
                  register={register}
                  check={false}
                  isUpdate={formStatus !== "post" && true}
                  subtitle={"(Tối đa 1500 ký tự)"}
                >
                  {errors.jobDescription?.message}
                </Textarea>
              </div>
              <div className="hr-post__textarea">
                <Textarea
                  label="Yêu cầu công việc"
                  id="jobRequirement"
                  placeholder="Nhập yêu cầu công việc..."
                  defaultValue={
                    formStatus !== "post" ? jobDetail?.requirement : ""
                  }
                  setValue={setValue}
                  register={register}
                  check={false}
                  isUpdate={formStatus !== "post" && true}
                  subtitle={"(Tối đa 1500 ký tự)"}
                >
                  {errors.jobRequirement?.message}
                </Textarea>
              </div>
              <div className="hr-post__textarea">
                <Textarea
                  label="Quyền lợi của ứng viên"
                  id="benefits"
                  placeholder="Nhập quyền lợi của ứng viên..."
                  defaultValue={
                    formStatus !== "post" ? jobDetail?.otherInfo : ""
                  }
                  register={register}
                  setValue={setValue}
                  check={false}
                  isUpdate={formStatus !== "post" && true}
                  subtitle={"(Tối đa 1500 ký tự)"}
                >
                  {errors.benefits?.message}
                </Textarea>
              </div>
              <div className="hr-post__salary">
                <label htmlFor="">
                  Trợ cấp<span className="field-requirment">*</span>
                </label>
                <div className="hr-post__salary-range">
                  <CustomInput
                    id="salaryMin"
                    placeholder="Từ bao nhiêu..."
                    register={register}
                    requirementField={false}
                    check={isNoSalary}
                    setValue={setValue}
                    subtitle="(Đơn vị VNĐ)"
                  >
                    {errors.salaryMin?.message}
                  </CustomInput>
                  <CustomInput
                    id="salaryMax"
                    placeholder="Đến bao nhiêu..."
                    register={register}
                    requirementField={false}
                    check={isNoSalary}
                    setValue={setValue}
                    subtitle="(Đơn vị VNĐ)"
                  >
                    {errors.salaryMax?.message}
                  </CustomInput>
                </div>
                <SwitchButton
                  state={isNoSalary}
                  setState={setIsNoSalary}
                  label="Không có trợ cấp"
                  fontSize="13px"
                />
              </div>
              <div className="hr-post__action">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  name={textBtn}
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostJobForm;
