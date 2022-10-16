import * as yup from "yup";
import { containerSchema } from "../Container/data";

export const genderList = [
  {
    id: 0,
    name: "Nam",
  },
  {
    id: 1,
    name: "Nữ",
  },
  {
    id: 2,
    name: "Khác",
  },
];

export const schema = containerSchema.shape({
  company: yup
    .string()
    .required('* Bạn phải chọn công ty.')
    .max(7, '* Tối đa 7 kí tự.'),
  jobPosition: yup
    .string()
    .required('* Bạn phải nhập vai trò tại công ty.')
    .matches(/^[^\W_]/, "* Đứng đầu phải là chữ cái hoặc số")
    .matches(/^(?!.*?[._]{2})/, "* Không được phép lặp lại 2 lần kí tự đặc biệt.")
    .min(3, '* Tối thiểu 3 kí tự.')
    .matches(/[^\W_]$/, "* Không đúng định dạng.")
    .max(64, '* Tối đa 64 kí tự.'),
})
