import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Head = ({openWindow}) => {
    return (
        <>
            <Box className="head">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Films
                        </Typography>
                        <PersonIcon sx={{cursor: 'pointer'}} onClick={openWindow}/>
                    </Toolbar>
                </AppBar>                
            </Box>
        </>

    )

}
export default Head