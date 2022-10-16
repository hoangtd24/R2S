import React from "react";
import "./styles.scss";

const DescriptionForm = ({ schoolName }) => {
  return (
    <div>
      <div className="description-form__container">
        <div className="description-form__header">
          <h2 className="description-form-heading">Thư giới thiệu mẫu</h2>
        </div>
        <div className="description-form__content">
          <p className="description-text">
            Kính chào Quý Cơ quan, Doanh nghiệp,{" "}
          </p>
          <br />
          <p className="description-text">
            Trường <b>{schoolName}</b> vinh dự và tự hào là đối tác tuyển dụng
            của quý cơ quan, doanh nghiệp.{" "}
          </p>
          <br />
          <p className="description-text">
            Nhằm hỗ trợ Quý Cơ quan/ Doanh nghiệp trong công tác thông tin tuyển
            dụng thực tập, việc làm đến sinh viên/ cựu sinh viên Trường{" "}
            <b>{schoolName}</b> Phía Trung tâm Hướng nghiệp - Tư vấn việc làm
            của Trường đã đăng tuyển và cung cấp thông tin ứng viên đến Quý đơn
            vị. Quý Cơ quan/ Doanh nghiệp vui lòng xem thông tin ứng viên bên
            dưới.
          </p>
          <br />
          <p className="description-text">
            Chúng tôi rất vui mừng trở thành cầu nối hiệu quả với các đối tác
            nhằm tạo việc làm cho người học và sự hợp tác thành công giữa hai
            bên.
          </p>
          <p className="description-text">Trân trọng cảm ơn!</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionForm;
