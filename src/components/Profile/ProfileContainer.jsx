import React from 'react'
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import { Divider } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export default function ProfileContainer(props) {

    return (
        <div className="company-infor__wrapper">
            <div className="company-infor__content">
                <div className="company-infor__col-1">
                    <img
                        className="company-infor__logo"
                        alt="Ảnh của công ty"
                        src="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                    />
                    <p className="company-infor__name">{props.profile?.name}</p>
                </div>
                <Divider orientation="horizontal" width="100%" height="2px" />
                <br />
                <div className="company-infor__profile">
                    <div className="company-infor__row">
                        <p className="company-infor__item">
                            <span>
                                {" "}
                                <EmailIcon />
                                Email:
                            </span>
                            <p className="screen__max-width-375px">
                                {props.profile?.email}
                            </p>
                        </p>
                        <p className="company-infor__item">
                            <span>
                                <PhoneIcon />
                                Số điện thoại:
                            </span>
                            {props.profile?.phone}
                        </p>
                    </div>
                    <div className="company-infor__row">
                        <p className="company-infor__item">
                            <span>
                                <LanguageIcon />
                                Website:
                            </span>
                            <a
                                style={{ textDecoration: "underline", color: "blue" }}
                                href={props.profile?.website}
                                target="_blank" rel="noreferrer"
                            >
                                {props.profile?.website}
                            </a>
                        </p>
                        {props.profile?.tax ? <p className="company-infor__item">
                            <span>
                                <ConfirmationNumberIcon />
                                Mã số thuế:
                            </span>
                            {props.profile?.tax}
                        </p> : <p className="company-infor__item">
                        
                            <span><DriveFileRenameOutlineIcon /> Tên viết tắt:</span>

                            {props.profile?.shortName}
                        </p>}
                    </div>
                    <p className="company-infor__des-company">
                        <span>Mô tả :</span>
                        <br />
                        {props.profile?.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
