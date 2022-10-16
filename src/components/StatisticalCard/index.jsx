import React from 'react'
import './styles.scss'

const StatisticalCard = ({ title, content }) => {
  return (
    <div className="statistical-card__container">
      <div className="statistical-card__heading-container">
        <h2 className="statistical-card__heading">{title}</h2>
      </div>
      <div className="statistical-card__content-container">
        <p className="statistical-card__content">{content}</p>
      </div>
    </div>
  )
}

export default StatisticalCard
