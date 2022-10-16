import * as yup from "yup";

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

const uni = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

const IMAGE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/bmp",
];

const PHONE_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im;

const regexName = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
};
export const schema = yup.object({
  avatar: yup
    .mixed()
    .test(
      "type",
      "* Chỉ hỗ trợ định dạng: jpeg, jpg, png, gif, bmp",
      (value) => {
        if (value?.type) {
          return IMAGE_FORMATS.includes(value?.type);
        } else {
          return true;
        }
      }
    )
    .test("fileSize", "*Kích thước tối đa là 512Kb.", (value) => {
      if (value?.size) {
        return value?.size <= 512 * 1024;
      } else {
        return true;
      }
    }),
  lastName: yup
    .string()
    .required("* Bạn phải nhập họ.")
    .min(2, "* Tối thiểu 2 ký tự.")
    .test("* Validate Tên", "* Họ không hợp lệ.", (value) => {
      return uni.test(regexName(value));
    })

    .max(32, "* Tối đa 32 ký tự."),
  firstName: yup
    .string()
    .required("* Bạn phải nhập tên.")
    .min(2, "* Tối thiểu 2 ký tự.")
    .test("* Validate Họ", "* Tên không hợp lệ.", (value) => {
      return uni.test(regexName(value));
    })
    .max(32, "* Tối đa 32 ký tự."),
  phone: yup
    .string()
    .required("* Bạn phải nhập số điện thoại.")
    .min(8, "* Tối thiểu 8 ký tự.")
    .max(13, "* Tối đa 13 ký tự.")
    .matches(PHONE_REGEX, "* Bạn đã nhập số điện thoại không đúng."),
  gender: yup
    .string()
    .required("* Bạn phải chọn giới tính.")
    .max(7, "* Tối đa 7 ký tự."),
});
