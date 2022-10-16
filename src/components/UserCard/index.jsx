import React from "react";
import "./styles.scss";

const UserCard = () => {
  return (
    <div className="user-card__container">
      <div className="user-card__heading">
        <div className="user-card__heading-avatar">
          <img
            src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_21.jpg"
            alt=""
          />
        </div>
        <div className="user-card__heading-name">
          <h3>Yasuo</h3>
        </div>
      </div>
      <div className="user-card__info">
        <span>Việc làm đã lưu</span>
        <span>
          {" "}
          Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển
          ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
        </span>
      </div>
      <div className="user-card__btns">
        {/* <div className="user-card__btns-auth-account">
          <Button name="Tài khoản đã xác thực" />
        </div> */}
        {/* <div className="user-card__btns-update-profile">
          <Button name="Cập nhật thêm Profile" />
        </div> */}
      </div>
    </div>
  );
};

export default UserCard;
