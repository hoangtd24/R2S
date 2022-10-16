import { Divider, Typography } from '@mui/material';
import React from 'react';

const FooterComponents = ({title, children}) => {
    return <div className='footer_components'>
        <Typography className='footer_title' variant='h3'>{title}</Typography>
        <Divider/>
        <div className='footer_children'>
            {children}
        </div>
    </div>;
}

export default FooterComponents;