import React from "react";
import { useState, useContext } from "react";
import Context from "../Contex";

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

import MyPagination from "../pagination/pagination";

const Filter = () => {

    const [value, setValue] = useState([80, 23]);
    const [valueInput, setValueInput] = useState('')

    const dataContext = useContext(Context)
    const styleLink = { textDecoration : 'none', fontSize : '22px'}


    const [sortValue , setSortValue] = useState("по популярности")

    const handleChange = (event, newValue) => {
      setValue(event.target.value);
    };

    const handleChangeValue = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            dataContext.actionValue(valueInput)
            localStorage.setItem('valueInput', JSON.stringify(valueInput))

        }
    }

    return (
        <>
            <Box sx={
                {
                    height: 400,
                    width: 300,
                    margin: 2,
                    display: "inline-block",
                    border: "1px solid #ccc",
                    borderRadius : "10px",      
                    padding : 2,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"   
                }} className="filter">

                <AppBar position="static" >
                    <Toolbar>
                        <Typography variant="h6">Filter</Typography>
                    </Toolbar>
                </AppBar>

                <TextField 
                    label="Enter your favourite film"
                    variant="outlined"
                    fullWidth 
                    sx={{marginTop : 1}}
                    onChange={(e) => setValueInput(e.target.value)}                 
                    onKeyDown={(e) => {
                        handleChangeValue(e)                       
                    }}
                />

                <h2>Sorting by :</h2>

                <div>
                    <div onClick={dataContext.actionPopular}><a style={styleLink} href='/popular'>popular</a></div>
                    <div onClick={dataContext.actionReting}><a style={styleLink} href='/rating'>rating</a></div>
                    <div onClick={dataContext.actionPopular}><a style={styleLink} href='/favorites'>favorites</a></div>                    
                </div>
 
                <Box >
                    <span>Year of release</span>

                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                    />
                </Box>

                <MyPagination />
            </Box>
        </>
    );
}

export default Filter