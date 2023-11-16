import React, {useState,  useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Contex';


import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const MyFavoriteFilms = ({api,  indexFilms, addDataAboutFilm, setNewCurrentId }) => {

    const dataContext = useContext(Context)
    const [index, setIndex] = useState(dataContext.state.indexFilms)
    const [data, setData] = useState()
    const [films, setFilms] = useState([])
    // console.log(api);

    const getFavoriteFilms = async () => {
        try {
          const response = await fetch( 'https://api.themoviedb.org/3/account/20556095/favorite/movies', {
            method : "GET",
            headers : {
              'accept' : 'application/json',
              'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `
            }
          })
    
          const result = await response.json()
          console.log(result);
          setFilms([...result.results])
          const currentFilms = result.results.slice(index.firstIndex, index.lastIndex)
          setFilms(currentFilms)
            
        }
        catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        getFavoriteFilms()
    }, [])

    const CardFilms = ({title, url, id}) => {

        const searchFilm = (id, e) => {
            e.preventDefault()
            let newObject = films.filter(film => film.id === id)
      
            dataContext.actionFilmInfo(...newObject) 
            dataContext.actionsCurrentId(id)

        }
        return (
            <Box className="card" sx={{display: "inline-block", margin : 2}}>
                <Card sx={{maxWidth : 345}} >
                    <CardMedia sx={{height : 140}}
                        image={`https://image.tmdb.org/t/p/w500${url}`}
                        title="green iguana"
                    />
                    <CardContent onClick={(e) => searchFilm(id, e)}>
                    {/* <a href='/detailsFilm '> */}
                        <a href='/detailsFilm'  >
                            <Typography variant='h5' component="div" onClick={() => console.log(id)} >{title}</Typography>
                        </a>
                    {/* </a> */}

                        
                        <Typography variant='body2' color="text.secondary" >рейтинг 10</Typography>
                    </CardContent>
                    
                </Card>                
            </Box>
        
        )

    }

    return (
        <>
            {films ? films.map(film => <CardFilms title={film.title} url={film.backdrop_path}  id={film.id} />) : console.log("error")}
        </>
    )
}

export default MyFavoriteFilms