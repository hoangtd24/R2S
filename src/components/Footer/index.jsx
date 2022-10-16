import React from "react";
import ComponentFooter from "./ComponentFooter";
import "./styles.scss";
import "./responsive.scss";
import AddressComponent from "./AddressComponent";
import { Link } from "react-router-dom";

const aboutUs = [
  {
    link: "/",
    content: "Trang chủ",
  },
  {
    link: "/about-us",
    content: "Về chúng tôi",
  },
  {
    link: "/contact",
    content: "Liên hệ",
  },
  {
    link: "/help",
    content: "Câu hỏi thường gặp",
  },
];

const policy = [
  {
    link: "/privacy-policy",
    content: "Chính sách bảo mật",
  },
  {
    link: "/terms-of-services",
    content: "Điều khoản dịch vụ",
  },
  {
    link: "/regulation",
    content: "Quy chế",
  },
];

const Footer = () => {
  return (
    <div id="page-footer-wrapper" className="page-footer-wrap">
      <section className="elementor-section">
        <section className="footer__first-section">
          <div id="first-section" className="elementor-row">
            <AddressComponent />
            <ComponentFooter header="Về IT JOBS" tabContent={aboutUs} />
            <ComponentFooter
              header="Chính sách"
              className="policy"
              tabContent={policy}
            />
            <div className="mobile-app-link-container">
              <div className="mobile-app-link-header">
                <h2 className="heading-primary elementor-heading-title">
                  Ứng dụng di động
                </h2>
              </div>
              <div className="mobile-app-link-download">
                <div className="mobile-app-link-chplay">
                  <Link to='/comming-soon' >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                      alt=""
                      style={{ width: "180px" }}
                      className="mobile-app-link-chplay-img"
                    />
                  </Link>
                </div>
                <div className="mobile-app-link-appstore">
                  <Link to='/comming-soon' >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Available_on_the_App_Store_%28black%29.png"
                      alt=""
                      style={{ width: "180px" }}
                      className="mobile-app-link-appstore-img"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <div className="address-footer-copyright">
        <div className="text-footer">
          <p>Copyright © 2022 R2S. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
