import React from 'react'
import Button from '../Button'
import './styles.scss'

const FeedBack = () => {
  return (
    <div className="feedback__container">
      <div className="feedback">
        <div className="feedback__heading">
          <div className="feedback__heading-title">
            <h2 className="feedback-title">CV của bạn đã đủ tốt?</h2>
          </div>
          <div className="feedback__heading-content">
            <p>Bao nhiêu NTD quan tâm đến hồ sơ của bạn</p>
          </div>
        </div>
        <div className="feedback-details">
          <div className="feedback-chart">
            <div className="chart-feedback">
              <h3>12</h3>
              <p>lượt</p>
            </div>
          </div>
          <div className="feedback-content-detail">
            <div className="feedback-content-info">
              <p>
                Mỗi lượt nhà tuyển dụng xem CV mang đến một cơ hội để bạn gần
                hơn với công việc phù hợp
              </p>
            </div>
            <div className="feedback-btn">
              <Button name="Khám phá ngay" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedBack
