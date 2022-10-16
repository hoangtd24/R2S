import * as React from 'react';

import CircularProgress, {

} from '@mui/material/CircularProgress';


import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CircularProgressWithLabel = (props) => {
  const full = {
    value: 100
  }
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e8eaf6',
      }} variant="determinate" {...full} />

      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <Typography variant="caption" component="div">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>

  )
}

export default CircularProgressWithLabel