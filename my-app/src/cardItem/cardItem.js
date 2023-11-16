import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const CardItem = ({title, url, id, searchFilm}) => {
    return (
        <Box className="card" sx={{display: "inline-block", margin : 2}}>
            <Card sx={{maxWidth : 345}} >
                <CardMedia sx={{height : 140}}
                    image={`https://image.tmdb.org/t/p/w500${url}`}
                    title="green iguana"
                />
                <CardContent onClick={(e) => searchFilm(id, e)}>

                    <Link to='/detailsFilm'  >
                      <Typography variant='h5' component="div" >{title}</Typography>
                    </Link>

                    <Typography variant='body2' color="text.secondary" >рейтинг 10</Typography>
                </CardContent>
                
            </Card>                
        </Box>
    )
}

export default CardItem