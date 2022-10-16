import React from "react";
import FooterComponents from "../../FooterComponents";
import './styles.scss'
const AboutUS = () => {
  return (
    <FooterComponents
      title="Về IT Jobs"
      children={
        <p className="aboutUS">
          <span>Kết nối đúng người đúng việc là một bài toán rất khó ở Việt Nam, là
          thách thức cho bất kỳ nền tảng tuyển dụng nào. Với mục tiêu ứng dụng
          công nghệ để thay đổi thị trường tuyển dụng, nhân sự ngày càng hiệu
          quả hơn, đầu năm 2022, ý tưởng về It Jobs ra đời.</span>
          <span>Bằng công nghệ, chúng
          tôi tạo ra nền tảng cho phép người lao động có thể tìm việc (chủ yếu
          là các thực tập sinh), tìm hiểu về các công ty và tương tác với các
          nhà tuyển dụng.</span>
          <span>Tập trung vào trải nghiệm dành của ứng viên khi đi tìm
          việc, mục tiêu của It Jobs là mang đến một nền tảng giúp ứng viên tiếp
          cận với các cơ hội việc làm phù hợp và kết nối các nhà tuyển dụng với
          các trường học có các sinh viên có nhu cầu thực tập.</span>
          <span>Mỗi ngày, chúng tôi kết nối hàng nghìn người với những cơ hội việc làm mới từ các
          doanh nghiệp uy tín.</span>
        </p>
      }
    />
  );
};

export default AboutUS;
