import * as yup from 'yup'
import { Link } from 'react-router-dom'

// yup validation for company table
export const schemaMajor = yup
  .object({
    name: yup.string().required(' * Bạn phải nhập tên chuyên ngành.')
  })
  .required()

// controll action
const controlAction = [
  // {
  //   id: 0,
  //   name: "Quản lý Major",
  //   to: "#",
  // },
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
