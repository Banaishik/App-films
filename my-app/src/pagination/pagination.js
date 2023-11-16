import { useState, useContext, useEffect } from "react";
import Context from "../Contex";


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function MyPagination() {
  const dataContext = useContext(Context)  

  const handleChange = (event, value) => {
    dataContext.actionIndex(value)
  };

  return (
    <div>
      <Stack spacing={2} sx={{marginLeft: 1}}>
        <Pagination
          count={5} 
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}

export default MyPagination;