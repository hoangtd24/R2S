import * as yup from "yup";

const CV_FORMATS = ["application/pdf"];

export const schema = yup.object({
  cv: yup
    .mixed()
    .test("type", "* Chỉ hỗ trợ định dạng pdf", (value) => {
      if (value?.type) {
        return CV_FORMATS.includes(value?.type);
      } else {
        return true;
      }
    })
    .test("fileSize", "* Kích thước tối đa là 512Kb.", (value) => {
      if (value.size) {
        return value.size <= 512 * 1024;
      } else {
        return true;
      }
    }),
});
