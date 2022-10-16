import React from "react";
import { Link } from "react-router-dom";
import FooterComponents from "../../FooterComponents";
import "./styles.scss";
const Help = () => {
  return (
    <FooterComponents
      title="Câu hỏi thường gặp"
      children={
        <div className="footer_help">
          <p className="help_container">
            <span className="help_answer">
              1. Tôi không tìm thấy nhóm ngành của mình?
            </span>
            <span className="help_question">
              - Hiện tại It Jobs mới có những nhóm ngành chính và phổ biến, những
              nhóm ngành ít phổ biến hơn sẽ được nhanh chóng cập nhật sau. Bạn
              có thể đề xuất với chúng tôi qua email (…) về nhóm ngành của bạn.
            </span>
          </p>
          <p className="help_container">
            <span className="help_answer">
              2. Tại sao CV nên được để ở định dạng PDF?
            </span>
            <span className="help_question">
              - CV của bạn tốt nhất nên được để ở dạng PDF để tránh những trường
              hợp bị lỗi như (hình ảnh, font chữ, cách đoạn…) khi xuất file hoặc
              CV bị người khác vô tình hay cố ý chỉnh sửa.
            </span>
          </p>
          <p className="help_container">
            <span className="help_answer">
              3. Dữ liệu của tôi có được bảo mật không?
            </span>
            <span className="help_question">
              - It Jobs cam kết bảo mật mọi thông tin liên quan đến dữ liệu của
              bạn.
            </span>
          </p>
          <p className="help_container">
            <span className="help_answer">
              4. Tại sao tôi nên đăng nhập tài khoản thường xuyên?
            </span>
            <span className="help_question">
              - It Jobs liên tục hoàn thiện sản phẩm với ra mắt những tính năng
              mới để có thể hỗ trợ tốt nhất cho người dùng. Vì vậy, bạn nên đăng
              nhập thường xuyên tài khoản của mình để cập nhật những tính năng
              mới nhất.
            </span>
          </p>
          <p className="help_container">
            <span className="help_answer">
              5.Tôi không đăng nhập được tài khoản đã tạo?
            </span>
            <span className="help_question">
              <span>
                {" "}
                - Nếu đây là lần đầu tiên bạn sử dụng It Jobs, vui lòng đăng ký
                tài khoản trước <Link to="/register/candidate" >tại đây</Link>.
              </span>
              <span>
                - Nếu bạn đã tạo tài khoản trước đó mà không nhớ chính xác mật
                khẩu, có thể lấy lại mật khẩu <Link to="/forgot-password">tại đây</Link> hoặc gửi email hỗ trợ tới
                (…)
              </span>
            </span>
          </p>
        </div>
      }
    />
  );
};

export default Help;
