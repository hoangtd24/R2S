import * as yup from "yup";
import { containerSchema } from "../Container/data";

const CV_FORMATS = ["application/pdf"];

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
  major: yup
    .string()
    .required('* Bạn phải chọn chuyên ngành.')
    .max(7, '* Tối đa 7 kí tự.'),
  cv: yup
    .mixed()
    .test("type", '* Chỉ hỗ trợ định dạng pdf', (value) => {
      if (value?.type) {
        return CV_FORMATS.includes(value?.type);
      } else {
        return true;
      }
    })
    .test("fileSize", '* Kích thước tối đa là 512Kb.', (value) => {
      if (value?.size) {
        return value?.size <= 512 * 1024;
      } else {
        return true;
      }
    }),
})
