import moment from "moment";
import * as yup from "yup";
import { mixed } from "yup/lib/locale";

const dateNow = moment(Date.now()).format("MM-DD-YYYY");

export const schemaFormPost = yup.object({
  name: yup.string().required(" * Bạn phải nhập trường này."),
  jobType: yup.string().required(" * Bạn phải nhập trường này."),
  major: yup.string().required(" * Bạn phải nhập trường này."),
  jobPosition: yup.string().required(" * Bạn phải nhập trường này."),
  amount: yup
    .string()
    .required(" * Bạn phải nhập trường này.")
    .test(
      "Validate space",
      " * Giá trị bạn vừa nhập không hợp lệ.",
      (value) => {
        return value.indexOf(" ");
      }
    )
    .test("Validate type", " * Giá trị bạn vừa nhập không hợp lệ.", (value) => {
      return !isNaN(value);
    })
    .test(
      "Validate type",
      " * Giá trị bạn vừa nhập phải là số nguyên và lớn hơn 0.",
      (value) => {
        return Number.isInteger(Number(value)) && Number(value) > 0;
      }
    ),
  timeStart: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(" * Bạn phải chọn ngày bắt đầu tuyển dụng.")
    .test(
      "Validate time start",
      " * Thời gian bắt đầu tuyển dụng không thể ở quá khứ.",
      (value) => {
        return moment(value).format("MM-DD-YYYY") >= dateNow;
      }
    ),
  timeEnd: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(" * Bạn phải chọn ngày kết thúc tuyển dụng.")
    .test(
      "Validate time end",
      " * Ngày kết thúc ứng tuyển phải sau ngày bắt đầu",
      (value, context) => {
        const dateStart = new Date(
          moment(context.parent.timeStart).format("MM-DD-YYYY")
        );
        const dateEnd = new Date(moment(value).format("MM-DD-YYYY"));
        return dateStart.getTime() < dateEnd.getTime();
      }
    ),
  district: yup.string().required(" * Bạn phải chọn quận/huyện."),
  province: yup.string().required(" * Bạn phải chọn tỉnh/thành phố."),
  country: yup.string().required(" * Bạn phải chọn quốc gia."),
  address: yup.string().required(" * Bạn phải nhập chi tiết địa chỉ."),
  jobDescription: yup.string().required(" * Bạn phải nhập mô tả công việc."),
  jobRequirement: yup.string().required(" * Bạn phải nhập mô tả công việc."),
  benefits: yup.string().required(" * Bạn phải nhập quyền lợi của ứng viên."),
  salaryMin: yup
    .string()
    .nullable()
    .test("Validate type", " * Giá trị bạn vừa nhập không hợp lệ.", (value) => {
      return !isNaN(value);
    })
    .test(
      "validate min salary",
      " * Mức trợ cấp tối thiểu là 1000.",
      (value) => {
        return value ? Number(value) >= 1000 : true;
      }
    ),
  salaryMax: yup
    .string()
    .nullable()
    .test("Validate type", " * Giá trị bạn vừa nhập không hợp lệ.", (value) => {
      return !isNaN(value);
    })
    .test(
      "validate max salary",
      " * Mức trợ cấp tối đa phải lớn hơn mức trợ cấp tối thiểu.",
      (value, context) => {
        return value ? Number(value) > context.parent.salaryMin : true;
      }
    ),
});
