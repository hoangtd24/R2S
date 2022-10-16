import moment from "moment";
import * as yup from "yup";

const date = moment(Date.now()).format("MM-DD-YYYY").toString();
const dateNow = moment(Date.now()).format("DD-MM-YYYY").toString();
const tomorow = new Date();
const tomorowFormat = moment(tomorow.setDate(tomorow.getDate() + 1)).format(
  "MM-DD-YYYY"
);

const fileSV_FORMATS = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
];

export const SAMPLEFORM = `Kính chào Quý Cơ quan, Doanh nghiệp\t\t,


Trường .................... vinh dự và tự hào là đối tác tuyển dụng của quý cơ quan, doanh nghiệp.

Nhằm hỗ trợ Quý Cơ quan/ Doanh nghiệp trong công tác thông tin tuyển dụng thực tập, việc làm đến sinh viên/ cựu sinh viên Trường ................... Phía Trung tâm Hướng nghiệp - Tư vấn việc làm của Trường đã đăng tuyển và cung cấp thông tin ứng viên đến Quý đơn vị. Quý Cơ quan/ Doanh nghiệp vui lòng xem thông tin ứng viên bên dưới.


Chúng tôi rất vui mừng trở thành cầu nối hiệu quả với các đối tác nhằm tạo việc làm cho người học và sự hợp tác thành công giữa hai bên.

Trân trọng cảm ơn!`;

// yup validate form post job form
export const schema = yup
  .object({
    jobName: yup.string().required(" * Bạn phải điền chức danh."),
    jobPosition: yup.string().notRequired(),
    major: yup.array().required(" * Bạn phải chọn chuyên ngành.").nullable(),
    jobType: yup.string().notRequired(),
    timeStart: yup
      .date()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .required("* Bạn phải chọn ngày bắt đầu ứng tuyển.")
      .min(
        `${date}`,
        ` * Bạn không thể chọn ngày bắt đầu tuyển sau ngày ${dateNow}`
      ),
    timeEnd: yup
      .date()
      .nullable()
      .transform((cur, ori) => (ori === "" ? null : cur))
      .required("* Bạn phải chọn ngày kết thúc ứng tuyển.")
      .min(`${tomorowFormat}`, "* Ngày hết hạn phải lớn hơn ngày bắt đầu"),
    jobDescription: yup.string().required(" * Bạn phải có thư giới thiệu."),
    // jobRequirement: yup.string().required(' * Bạn phải nhập mô tả công việc.'),
    // otherInfo: yup.string(),
    amount: yup
      .number()
      .typeError(
        " * Số lượng ứng viên không được để trống hoặc không phải là số."
      )
      .min(1, " * Số lượng ứng viên phải lớn hơn 0. ")
      .integer(" * Số lượng ứng viên phải là số nguyên. "),
    fileSV: yup
      .mixed()
      .test("file", " * Yêu cầu có danh sách sinh viên.", (value) => {
        if (value.name) {
          return value;
        } else {
          return false;
        }
      })
      .test(
        "fileSize",
        " * Danh sách sinh viên bạn chọn quá lớn. Kích thước tối đa là 512Kb.",
        (value) => {
          if (value?.size) {
            return value && value?.size <= 512 * 1024;
          } else {
            return false;
          }
        }
      )
      .test("type", " * Chỉ hỗ trợ xlsx.", (value) => {
        if (value?.type) {
          return value && fileSV_FORMATS.includes(value?.type);
        } else {
          return false;
        }
      }),
  })
  .required();
