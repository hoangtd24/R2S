import React, { useState } from 'react'
import PropTypes from "prop-types";

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import Button from 'src/components/Button';
import Modal from 'src/components/Modal';

export default function CandidateInfo({
    image,
    name,
    major,
    formality,
    numberPhone,
    email,
    date,
    imageCV,
}) {
    const [open,setOpen] = useState(false)
    const [click,setClick] = useState(false)
    return (
        <div className='candidate'>
            <img src={image} alt={image}></img>
            <div className='candidate_info'>
                <h3>{name}</h3>
                <p>Chuyên ngành: <span>{major}</span></p>
                <p>Phương thức làm việc: <span>{formality}</span></p>
                <p>Số điện thoại: <span>{numberPhone}</span></p>
                <p>Email: <span>{email}</span></p>
            </div>
            <div className='candidate_choise'>
                <span>{date}</span>
                <div className='choise'>
                    <Button
                        name='Xem CV'
                        onClick={() => setOpen(!open)}
                    />
                    {click ? <BookmarkBorderIcon onClick={() => setClick(!click)} className='favorite' /> : <BookmarkIcon onClick={() => setClick(!click)} className='favorite' />}
                </div>
            <Modal
                iconClose={true}
                modalTitle="Xem CV Ứng Viên"
                open={open}
                setOpen={setOpen}
                
                children={
                    <div><img width={'100%'} height={'100%'} src={imageCV}></img></div>
                }
                />
                </div>
        </div>
    )
}
CandidateInfo.propTypes = {
    image : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    specialized : PropTypes.string.isRequired,
    formality : PropTypes.string.isRequired,
    numberPhone : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired,
    date : PropTypes.string.isRequired,
    imageCV : PropTypes.string.isRequired
};
