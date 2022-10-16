import React from 'react'
import './CandidateManagement.scss'
import CandidateInfo from './CandidateInfo';

export default function CandidateManagement() {
  
  return (
    <div className='CandidateManagement_Container'>
      <CandidateInfo 
      image="https://cdn.tgdd.vn/Files/2020/12/29/1316941/cach-cai-hinh-nen-doi-theo-ngay-dem-tren-iphone-d-1.jpg"
      name="Bùi Anh Thư"
      specialized="Công Nghệ Phần Mềm"
      formality="PartTime"
      numberPhone="0123456789"
      email="tuong@gmail.com"
      date="09/06/2022 09:43 AM"
      imageCV="http://103.48.192.239:8085/images/2022/meomeo.jpg"
      />
    </div>
  )
}
