import moment from "moment";
import * as yup from "yup";

const dateNow = moment(Date.now()).format("DD-MM-YYYY").toString();

export const schemaFormUpdate = yup.object({
  name: yup.string().required(" * Bạn phải điền chức danh."),
  jobType: yup.string().required(" * Bạn phải chọn hình thức làm việc."),
  major: yup.string().required(" * Bạn phải chọn chuyên ngành."),
  jobPosition: yup.string().required(" * Bạn phải chọn vị trí công việc."),
  amount: yup
    .number()
    .typeError(
      " * Số lượng ứng viên không được để trống hoặc không phải là số."
    )
    .min(1, " * Số lượng ứng viên phải lớn hơn 0. ")
    .integer(" * Số lượng ứng viên phải là số nguyên. "),
  timeStart: yup
    .date()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(" * Bạn phải chọn ngày bắt đầu tuyển dụng.")
    .test(
      "Validate time start",
      " * Không thể chọn thời gian trước ngày đã chọn lúc tạo.",
      (value) => {
        const dateBefore = sessionStorage.getItem("timeStart");
        return moment(value).format("MM-DD-YYYY") >= dateBefore;
      }
    ),
  timeEnd: yup
    .date()
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
