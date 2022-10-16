import * as yup from 'yup'
import { Link } from 'react-router-dom'

// yup validation for company table
export const schema = yup
  .object({
    logo: yup.mixed().nullable().required('Bạn phải chọn ảnh cho công ty'),
    // .test(
    //   "FILE_SIZE",
    //   "Uploaded file is too bid!",
    //   (value) => !value || (value && value.size <= 1024 * 1024)
    // ),
    name: yup.string().required(' * Bạn phải nhập tên công ty.'),
    website: yup.string().required(' * Bạn phải nhập tên website công ty.'),
    email: yup
      .string(' * email không hợp lệ.')
      // .email(" * Ban nhap email khong dung")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        ' * Email khong hop le'
      )
      .required(' * Bạn phải nhập email công ty.'),
    phone: yup
      .string()
      .required(' * Bạn phải nhập số điện thoại.')
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        ' * Số điện thoại không đúng.'
      ),
    // type: yup
    //   .array()
    //   .nullable()
    //   .min(1, " * Bạn phải chọn Type của công ty")
    //   .required(" * Bạn phải chọn Type của công ty"),
    tax: yup
      .string()
      .required(' * Bạn phải nhập mã số thuế.')
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        ' * Mã số thuế không đúng.'
      ),
    description: yup.string().required(' * Bạn phải nhập mô tả công ty.'),
    address: yup.string().required(' * Bạn phải nhập chi tiết địa chỉ.')
    // district: yup.string().required(" * Bạn phải nhập quận/huyện."),
    // province: yup.string().required(" * Bạn phải nhập tỉnh/thành phố.")
  })
  .required()

// controll action
const controlAction = [
  {
    id: 0,
    name: 'Quản lý bài đăng',
    to: '#'
  },
  {
    id: 1,
    name: 'Xem bài đăng',
    to: '#'
  },
  {
    id: 2,
    name: 'Thêm bài đăng',
    to: '#'
  }
]

// render control action
export const renderControlAction = () => {
  return controlAction.map(item => {
    return (
      <li key={item.id}>
        <Link to={item.to} className="link">
          {item.name}
        </Link>
      </li>
    )
  })
}
