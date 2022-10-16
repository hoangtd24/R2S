import moment from "moment";
import * as yup from "yup";

const date = moment(Date.now()).format("MM-DD-YYYY").toString();

export const schema = yup.object({
  timeStart: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(" * Bạn phải chọn ngày bắt đầu tuyển dụng.")
    .min(`${date}`, " * Bạn không thể chọn ngày bắt đầu tuyển ở quá khứ."),
  timeEnd: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(" * Bạn phải chọn ngày kết thúc tuyển dụng.")
    .min(yup.ref("timeStart"), " * Ngày hết hạn phải lớn hơn ngày bắt đầu."),
});
