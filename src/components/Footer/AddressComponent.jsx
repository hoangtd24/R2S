import React from "react";
import "./styles.scss";

const AddressComponent = () => {
  return (
    <div className="address__container-footer">
      <h2 className="heading-primary elementor-heading-title">Địa chỉ</h2>
      <div className="address-footer-content">
        <div className="address-footer-headquarters">
          <div className="address-headquarters-content"></div>
          <div className="text-footer">
            <p>
              Trụ sở:
              <span style={{ fontWeight: "400", marginLeft: "4px" }}>
                Lầu 8, Toà Nhà Pearl Plaza, 561A đường Điện Biên Phủ, Phường 25,
                Quận Bình Thạnh, Thành Phố Hồ Chí Minh
              </span>
            </p>
          </div>
        </div>
        <div className="address-footer-office">
          <div className="text-footer">
            <p>
              Văn phòng:
              <span style={{ fontWeight: "400", marginLeft: "4px" }}>
                A005 Tầng trệt Chung cư Linh Đông, 1164 đường Phạm Văn Đồng,
                P.Linh Đông, TP Thủ Đức, Thành Phố Hồ Chí Minh
              </span>
            </p>
          </div>
        </div>
        <div className="address-footer-hotline">
          <div className="text-footer">
            <p>
              <span style={{ fontWeight: "900", marginRight: "4px" }}>
                Hotline:
              </span>
              0919 365 363
            </p>
          </div>
        </div>
        <div className="address-footer-email">
          <div className="text-footer">
            <a
              className="email-link__footer"
              href="mailto:tuyendung@r2s.com.vn"
            >
              <p>
                <span style={{ fontWeight: "900", marginRight: "4px" }}>
                  Email:
                </span>
                tuyendung@r2s.com.vn
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;
