import { Typography } from '@mui/material';
import React from 'react';

const UserInfo = (props) => {
    return (
        <div className="profile_content">
            <Typography variant="subtitle2">{props.name} :</Typography>
            <Typography variant="caption2">
                {props.profile}
            </Typography>
        </div>
    )
}
export default UserInfo;