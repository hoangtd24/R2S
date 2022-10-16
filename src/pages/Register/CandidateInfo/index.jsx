import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {} from "src/components/CustomInput/components";
import InputFile from "src/components/InputFile";
import { errorSelector } from "src/store/selectors/main/registerSelectors";
import { registerCandidate } from "src/store/slices/main/register/registerSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import { genderList, schema } from "./data";
import SelectCustom from "../../../components/Select";
import { getMajorList } from "../../../store/slices/Admin/major/majorSlice";
import Container from "../Container";
import "./styles.scss";
const CandidateInfo = () => {
  TabTitle("Đăng ký - Ứng viên");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const errorMessage = useSelector(errorSelector);

  useEffect(() => {
    dispatch(getMajorList([1, 20]));
  }, [dispatch]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const onSubmit = async (data) => {
    const userData = {
      fileCV: data.cv || null,
      fileAvatar: data.avatar || null,
      candidate: JSON.stringify({
        createUser: {
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          gender: parseInt(data.gender),
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          email: data.email,
        },
        major: {
          id: parseInt(data.major),
        },
      }),
    };

    try {
      const res = await dispatch(registerCandidate(userData));
      if (res.payload.status === 200 || res.payload.status === 201) {
        toast.success("Đăng ký tài khoản thành công");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Container
      title="Ứng Viên"
      onClick={handleBackClick}
      handleClick={handleSubmit(onSubmit)}
      err={errors}
      errorMessage={errorMessage}
      genderList={genderList}
      register={register}
      setValue={setValue}
      children={
        <>
          <SelectCustom
            label="Chuyên ngành"
            placeholder="Vui lòng chọn..."
            options={majorList}
            id="major"
            register={register}
          >
            {errors.major?.message}
          </SelectCustom>
          <InputFile
            label="CV"
            requirementField={false}
            id="cv"
            format="pdf"
            setValue={setValue}
            register={register}
          >
            {errors.cv?.message}
          </InputFile>
        </>
      }
    />
  );
};
export default CandidateInfo;
