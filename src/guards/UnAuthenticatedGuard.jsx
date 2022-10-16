import React, { Fragment } from 'react'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const UnAuthenticatedGuard = ({ children }) => {
  const authenticated = useAuthenticated()
  const navigate = useNavigate()
  const { profile } = useSelector(state => state.user)
  if (authenticated) {
    const role = profile?.role
    switch (role) {
      case 'Role_HR':
        navigate(`/hr`, { replace: true })
        break
      case 'Role_Partner':
        navigate(`/partner`, { replace: true })
        break
      default:
        navigate(`/candidate`, { replace: true })
    }
  }
  return <Fragment>{children}</Fragment>
}
UnAuthenticatedGuard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default UnAuthenticatedGuard
