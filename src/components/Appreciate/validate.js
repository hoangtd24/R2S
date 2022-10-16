import * as yup from "yup";

export const schema = yup.object({
  comment: yup.string().required(" * Trường này không để trống"),
  title: yup.string(),
});