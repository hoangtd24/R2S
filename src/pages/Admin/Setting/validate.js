import * as yup from "yup";

export const schema = yup
  .object({
    oldPassword: yup
      .string()
      .required(" * Bạn phải nhập mật khẩu cũ.")
      .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
        " * Vui lòng nhập lại mật khẩu."
      ),
    newPassword: yup
      .string()
      .required(" * Bạn phải nhập mật khẩu mới.")
      .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
        " * Vui lòng nhập lại mật khẩu."
      )
      .notOneOf(
        [yup.ref("oldPassword")],
        " * Mật khẩu mới không thể trùng với mật khẩu cũ."
      ),
    confirmNewPassword: yup
      .string()
      .required(" * Bạn phải nhập xác nhận lại mật khẩu.")
      .oneOf([yup.ref("newPassword"), null], " * Mật khẩu chưa khớp."),
  })
  .required();
