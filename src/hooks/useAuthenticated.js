import { useSelector } from 'react-redux'

export function useAuthenticated() {
  const { user } = useSelector(state => state.profile)
  return (!!user?.idUser)
}
