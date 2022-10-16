import React, { useEffect } from 'react'
import CandidateProfile from 'src/components/CandidateProfile'
import './styles.scss'
import ContactCandidate from 'src/components/ContactCandidate'
import { useDispatch, useSelector } from 'react-redux'
import { getCandidateById } from 'src/store/slices/main/candidate/info/infoCandidateSlice'

const CandidateSaveProfile = () => {
  const dispatch = useDispatch()

  const { candidateInfoById } = useSelector(state => state.infoCandidate)
  useEffect(() => {
    dispatch(getCandidateById(1))
  }, [dispatch])

  return (
    <div className="candidate-save-profile__container">
      <div className="candidate-card-profile-container">
        <CandidateProfile candidateInfoById={candidateInfoById} />
        <ContactCandidate candidateInfoById={candidateInfoById} />
      </div>
    </div>
  )
}

export default CandidateSaveProfile
