import React from 'react';
import FooterComponents from '../../FooterComponents';
import './styles.scss'
const Contact = () => {
    return <FooterComponents
    title="Liên hệ"
    children={<div className='contact'>
        <p className='contact_company'><span className='contact_company_name'>Công ty: </span> <span>CÔNG TY CỔ PHẦN R2S</span></p>
        <p className='contact_company'><span className='contact_company_name'>Trụ sở: </span> <span>Lầu 8, Toà Nhà Pearl Plaza, 561A đường Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Thành Phố Hồ Chí Minh</span></p>
        <p className='contact_company'><span className='contact_company_name'>Văn phòng: </span> <span>A005 Tầng trệt Chung cư Linh Đông, 1164 đường Phạm Văn Đồng, P. Linh Đông, TP Thủ Đức, Thành Phố Hồ Chí Minh</span></p>
        <p className='contact_company'><span className='contact_company_name'>Số điện thoại: </span> <span> ... </span></p>
        <p className='contact_company'><span className='contact_company_name'>Email: </span> <span> ... </span></p>
    </div>}
    />
}

export default Contact;