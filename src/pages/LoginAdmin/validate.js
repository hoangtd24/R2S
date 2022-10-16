import * as yup from "yup";

export const schema = yup
  .object({
    username: yup
      .string()
      .required('* Bạn phải nhập tài khoản.'),
    password: yup
      .string()
      .required('* Bạn phải nhập mật khẩu.')
  })
