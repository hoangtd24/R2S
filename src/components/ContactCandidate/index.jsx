import React, { useState } from "react";
import "./styles.scss";

const ContactCandidate = () => {
  const [checked, setChecked] = useState(1);
  const listCV = [
    {
      id: 1,
      value: "CV Online",
    },
    {
      id: 2,
      value: "TopCV Profile",
    },
  ];
  return (
    <div className="contact-candidate__container">
      <div className="finding-status">
        <h3>Trạng thái tìm việc đang tắt</h3>
      </div>
      <p className="notice-text">
        Bật tìm việc để nhận được nhiều cơ hội việc làm tốt nhất từ topCV
      </p>
      <div className="accept-contact">
        <h3>Cho phép NTD liên hệ bạn qua</h3>
        <div className="select-contact">
          {listCV.map((list, index) => (
            <div className="select-cv" key={index}>
              <input
                type="radio"
                checked={checked === list.id}
                onChange={() => setChecked(list.id)}
                className="input-contact-candidate"
              />
              {list.value}
            </div>
          ))}
        </div>
        <div className="notice-mark">
          <p>
            TopCV Profile của bạn đang hoàn thiện dưới 70% vui lòng cập nhật
            thêm thông tin hoặc chọn CV Online để nhà tuyển dụng có thể tiếp cận
            bạn
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactCandidate;
