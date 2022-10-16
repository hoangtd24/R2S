import Button from "../Button";
import ButtonOutline from "../ButtonOutline";
import CustomInput from "../CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./styles.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addJob } from "src/store/slices/main/home/job/jobSlice";
import { schema } from "./validateForm";

export const ConfirmDate = ({ jobDetail, setOpen, nameBtnYes, nameBtnNo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const jobData = {
      name: jobDetail[0].name,
      hr: {
        id: jobDetail[0].hr?.id,
      },
      description: jobDetail[0].description,
      major: {
        id: jobDetail[0].major?.id,
      },
      jobType: {
        id: jobDetail[0].jobType,
      },
      amount: jobDetail[0].amount,
      salaryMin: jobDetail[0].salaryMin,
      salaryMax: jobDetail[0].salaryMax,
      requirement: jobDetail[0].requirement,
      otherInfo: jobDetail[0].otherInfo,
      timeStartStr: moment(data.timeStart).format("YYYY-MM-DD"),
      timeEndStr: moment(data.timeEnd).format("YYYY-MM-DD"),
      jobposition: {
        id: jobDetail[0].jobposition?.id,
      },
      locationjob: {
        id: jobDetail[0].locationjob?.id,
        district: {
          id: jobDetail[0].locationjob?.district?.id,
          province: {
            id: jobDetail[0].locationjob?.district?.province?.id,
            countries: {
              id: jobDetail[0].locationjob?.district?.province?.countries?.id,
            },
          },
        },
        address: jobDetail[0].locationjob?.address,
      },
    };
    // dispatch(addJob(jobData));
  };
  return (
    <>
      <div className="confirmation-date__wrapper">
        <form action="" className="confirmation-date__form">
          <CustomInput
            id="timeStart"
            label="Ngày bắt đầu tuyển"
            register={register}
            type="date"
          >
            {errors.timeStart?.message}
          </CustomInput>
          <CustomInput
            id="timeEnd"
            label="Ngày hết hạn tuyển"
            register={register}
            type="date"
          >
            {errors.timeEnd?.message}
          </CustomInput>
        </form>
        <div className="confirmation-date__btns">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="confirmation-date__btns--add-job"
            name={nameBtnYes}
            fz="14px"
            outline="1.5px solid #DEDEDE"
          />
          <ButtonOutline
            className="confirmation-date__btns-cancel"
            onClick={() => setOpen(false)}
            name={nameBtnNo}
            bg="#F3F4F6"
            color="#111111"
            radius="4px"
            fz="14px"
            outline="1.5px solid #DEDEDE"
          />
        </div>
      </div>
    </>
  );
};
