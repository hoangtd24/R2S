import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorSelector } from "src/store/selectors/main/registerSelectors";
import { getCompanyList } from "src/store/slices/Admin/company/companySlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import { genderList, schema } from "./data";
import CustomInput from "../../../components/CustomInput";
import SelectCustom from "../../../components/Select";
import { registerHr } from "../../../store/slices/main/register/registerSlice";
import Container from "../Container";
import "./styles.scss";
import { updateStatusRegisterForHR } from "src/store/slices/main/register/registerSlice";
const HRInfo = () => {
  TabTitle("Đăng ký - Nhà tuyển dụng");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyList } = useSelector((state) => state.company);
  const { statusRegister } = useSelector((state) => state.register);
  const errorMessage = useSelector(errorSelector);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getCompanyList([1, 20]));
    if (statusRegister === "successRegister") {
      navigate("/home");
      dispatch(updateStatusRegisterForHR("idleRegister"));
    }
  }, [statusRegister, dispatch]);

  const onSubmit = async (data) => {
    const hrData = {
      hr: JSON.stringify({
        user: {
          username: data.username,
          phone: data.phone,
          gender: parseInt(data.gender),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        position: data.position,
        company: {
          id: parseInt(data.company),
        },
      }),
      fileAvatar: data.avatar || null,
    };
    dispatch(registerHr({ hrData, navigate }));
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Container
      title="Nhà Tuyển Dụng"
      onClick={handleBackClick}
      handleClick={handleSubmit(onSubmit)}
      err={errors}
      errorMessage={errorMessage}
      genderList={genderList}
      register={register}
      setValue={setValue}
      children={
        <div className="register__container__form--name">
          <SelectCustom
            label="Công ty"
            placeholder="Vui lòng chọn..."
            options={companyList}
            id="company"
            register={register}
          >
            {errors.company?.message}
          </SelectCustom>

          <CustomInput
            label="Vai trò tại công ty"
            id="jobPosition"
            type="text"
            placeholder="Vị trí..."
            register={register}
            requirementField={false}
          >
            {errors.jobPosition?.message}
          </CustomInput>
        </div>
      }
    />
  );
};

export default HRInfo;
