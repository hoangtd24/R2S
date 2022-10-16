import * as yup from 'yup'
import { Link } from 'react-router-dom'

// yup validation for company table
export const schema = yup
  .object({
    district: yup.string().required(' * Bạn phải nhập tên quận.'),
    province: yup.string().required(' * Bạn phải nhập tên tỉnh/thành phố.'),
    countries: yup.string().required(' * Bạn phải nhập tên quốc gia.'),
    address: yup.string().required(' * Bạn phải nhập địa chỉ'),
    note: yup.string().required(' * Bạn phải nhập thêm chú thích.')
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
