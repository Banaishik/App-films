import React, {useState,  useEffect, useContext } from 'react';
import Context from '../Contex';
import CardItem from '../cardItem/cardItem';

const CardList = ({api}) => {

    const dataContext = useContext(Context)
    const [films, setFilms] = useState(null)
    const [index, setIndex] = useState(dataContext.state.indexFilms)

    const fethcRequest = async (api) => {
      try {
        const response = await fetch( api, {
          method : "GET",
          headers : {
            'accept' : 'application/json',
              'Content-type': "application/json",
              'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `
          }
        })
  
        const result = await response.json()

        const currentFilms = result.results.slice(index.firstIndex, index.lastIndex)
        setFilms(currentFilms)    
      }
      catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fethcRequest(api)
    }, [])

    const searchFilm = (id, e) => {
      e.preventDefault()
      let newObject = films.filter(film => film.id === id)
      
      dataContext.actionFilmInfo(...newObject)
      dataContext.actionsCurrentId(id)
    }

    return (
        <>
          <div style={{display: "inline-block"}} >
              { 
                films ? (
                  films.map( film => <CardItem title={film.original_title} url={film.poster_path} id={film.id} searchFilm={searchFilm} />) 
                ) : (
                  <p>Data loading...</p>
                )
              }               
          </div>
        </>

    )
}



export default CardList