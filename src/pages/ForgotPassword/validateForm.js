import * as yup from "yup";

export const schema = yup
  .object({
    email: yup
      .string()
      .required(" * Bạn phải nhập địa chỉ email.")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        " * Email không hợp lệ."
      ),
  })
  .required();
