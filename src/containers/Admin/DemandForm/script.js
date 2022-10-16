import * as yup from 'yup'
import { Link } from 'react-router-dom'

// yup validation for company table
export const schema = yup
  .object({
    name: yup.string().required('Bạn phải điền tiêu đề'),
    description: yup.string().required('Bạn phải điền mô tả'),
    requirement: yup.string().required('Bạn phải nhập yêu cầu'),
    otherInfo: yup.string().nullable(),
    partner: yup.number().nullable(),
    end: yup.date().nullable(),
    start: yup.date().nullable(),
    major: yup.number.nullable,
    students: yup.mixed().nullable()
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
