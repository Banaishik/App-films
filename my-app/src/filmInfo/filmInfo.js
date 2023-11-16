import React, {useState, useEffect, useContext} from "react"
import Context from "../Contex";


import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteButton from "../fovoriteIcon/favoriteIcon";


const FilmInfo = () => {

    const dataContext = useContext(Context)
    let currentId = dataContext.state.currentId 
    let favorite = dataContext.state.favorite
    const [data, setData] = useState([])
    const [actors, setActors] = useState([])

    const getDetailsFilms = async (id) => {
        const response = await fetch (`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            method : "GET", 
            headers : {
                'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `,
                'Content-Type' : 'application/json'
            }
        })

        const result = await response.json()
        setData(result)
    }
    const getActorsFilms = async (id) => {
        const response = await fetch (`https://api.themoviedb.org/3/movie/${id}/credits`, {
            method : "GET", 
            headers : {
                'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `,
                'Content-Type' : 'application/json'
            }
        })

        const result = await response.json()

        if (result.cast === undefined) {
            alert('Произошел сбой извините пожалуйста')
        } else {
            const mainActors = result.cast.slice(0, 4)
            setActors(mainActors)      
        }


    }
    useEffect(() => {
        getDetailsFilms(currentId)
        getActorsFilms(currentId)
    }, [])


    return (
        <>
            <div style={{marginBottom : "350px"}}>
                <h1>
                    <ArrowBackIcon sx={{cursor: "pointer", marginRight : "20px"}} onClick={dataContext.goBack} />
                    <spam style={{marginRight : "20px"}}>{data.title } </spam>
                    <FavoriteButton sx={{cursor: 'pointer', marginLeft : "20px"}} currentId={currentId}  isFavorite={favorite} clickAction={dataContext.actionFavorite}/> 
                </h1>                
                <div  style={{display: 'inline-block'}}>

                    <div style={{display: 'inline-block', margin : '20px'}}>
                        <h1>Details</h1>
                        <h4>Year : {data.release_date}</h4>                 
                        <h4>Time : {data.runtime} минут</h4>                 
                        <h4>Budget : {data.budget}</h4>                 
                    </div>
                    <div style={{display: 'inline-block', margin : '20px'}}>
                        
                        {
                            actors.map(actor => <h4>{actor.name}</h4>)
                        }                
                    </div>
                    
                </div>
                <div  style={{display: 'inline-block', margin : "0 0 0 220px"}}> 
                    <img src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}  alt="myImage film" />
                </div>    

            </div>

        </>
    )
}


export default FilmInfo