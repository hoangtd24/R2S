import * as yup from "yup";
import { containerSchema } from "../Container/data";

const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/; //check : https://www.regextester.com/99895
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im

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
  registerPartner: yup
    .string()
    .default(null)
    .nullable(),
  logo: yup
    .mixed()
    .test("type", '* Chỉ hỗ trợ định dạng: jpeg, jpg, png, gif, bmp', (value) => {
      if (value?.type) {
        return IMAGE_FORMATS.includes(value?.type);
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
  schoolName: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải nhập tên trường.')
        .matches(/^[^\W_]/, "* Đứng đầu phải là chữ cái hoặc số")
        .matches(/[a-zA-Z0-9\w]*$/, "* Không được chứa kí tự đặc biệt ngoại trừ gạch dưới gạch ngang và dấu chấm.")
        .matches(/^(?!.*?[._]{2})/, "* Không được phép lặp lại 2 lần kí tự đặc biệt.")
        .min(3, '* Tối thiểu 3 kí tự.')
        .matches(/[^\W_]$/, "* Không đúng định dạng.")
        .max(64, '* Tối đa 64 kí tự.'),
    }),
  shortName: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải nhập tên viết tắt của trường.')
        .matches(/^[^\W_]/, "* Yêu cầu một chữ cái không dấu hoặc số đứng đầu.")
        .matches(/[a-zA-Z0-9\w]*$/, "* Không được chứa kí tự đặc biệt ngoại trừ gạch dưới gạch ngang và dấu chấm.")
        .min(3, '* Tối thiểu 3 kí tự.')
        .matches(/[^\W_]$/, "* Không đúng định dạng.")
        .max(16, '* Tối đa 16 kí tự.')
    }),
  position: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải nhập vai trò tại trường.')
        .matches(/^[^\W_]/, "* Đứng đầu phải là chữ cái hoặc số")
        .matches(/^(?!.*?[._]{2})/, "* Không được phép lặp lại 2 lần kí tự đặc biệt.")
        .min(3, '* Tối thiểu 3 kí tự.')
        .matches(/[^\W_]$/, "* Không đúng định dạng.")
        .max(64, '* Tối đa 64 kí tự.'),
    }),
  website: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải nhập website trường.')
        .min(5, '* Tối thiểu 5 kí tự.')
        .max(128, '* Tối đa 128 kí tự.')
        .matches(URL_REGEX, '* Bạn đã nhập địa chỉ website trường không đúng.'),
    }),
  typeSchool: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required("* Bạn phải chọn loại hình."),
    }),
  district: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải chọn quận/huyện.')
        .max(7, 'Tối đa 7 kí tự.'),
    }),
  province: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải chọn tỉnh/thành phố.')
        .max(7, '* Tối đa 7 kí tự.'),
    }),
  country: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải chọn quốc gia.')
        .max(7, '* Tối đa 7 kí tự.'),
    }),
  address: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải nhập địa chỉ.')
        .matches(/^[^\W_]/, "* Đứng đầu phải là chữ cái hoặc số")
        .min(6, '* Tối thiểu 6 kí tự.')
        .max(64, '* Tối đa 64 kí tự.'),
    }),
  emailSchool: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải nhập email trường.')
        .min(6, '* Tối thiểu 6 kí tự.')
        .max(64, '* Tối đa 64 kí tự.')
        .matches(EMAIL_REGEX, '* Bạn đã nhập email không đúng định dạng.'),
    }),
  phoneSchool: yup
    .string()
    .nullable()
    .when("registerPartner", {
      is: registerPartner => !registerPartner,
      then: yup
        .string()
        .required('* Bạn phải nhập số điện thoại trường.')
        .min(8, '* Tối thiểu 8 kí tự.')
        .max(11, '* Tối đa 11 kí tự.')
        .matches(PHONE_REGEX, '* Bạn đã nhập số điện thoại không đúng.'),
    }),
});
