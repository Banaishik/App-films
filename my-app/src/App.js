import React, {useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reducer from './reducer/reducer';

import { Box } from '@mui/material';
import Head from './head/head';
import Filter from './filter/filter';
import CardList from './cardList/cardList';
import FilmInfo from './filmInfo/filmInfo';
import Context from './Contex';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  const initialState = {
    sort : {popular : false, rating : true},
    indexFilms : {firstIndex : 1, lastIndex : 4},
    keyForRender : 1,
    filmInfo : {title : null, year : null, info : null},
    filmsSearch : [],
    value : null,
    open : {
        request : false,
        confirm : false,
        user : false
    },

    favorite : false,
    currentId : null, 
    ids : [],
    favoritFilms : [],
    idDelete : null
  }

  const [state, dispatch] = useReducer(reducer , initialState) 
  const [keyForRender, setKeyForRender] = useState(1)

  let currentValue = JSON.parse(localStorage.getItem('valueInput')) 
  let apiSerach  = `https://api.themoviedb.org/3/search/movie?query=${currentValue}&include_adult=false&language=en-US&page=1`
  const apiPopular = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
  const apiRating = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
  const apiFavorite = 'https://api.themoviedb.org/3/account/20556095/favorite/movies'
  const idFavoriteFilms = JSON.parse(localStorage.getItem('id')) 

  useEffect(() => {
      checkIdFavoriteArray()
  }, [])

  useEffect(() => {
    setFavoriteFilm(state.ids)
  }, [state.ids])

  useEffect(() => {
    if (state.value) {
      window.location.assign('/searchFilms')
    }
  }, [state.value])

  useEffect(() => {
    if (state.idDelete) {
      deleteFavoriteFilm(state.idDelete)
    }
  }, [state.idDelete])

  
  const rerenderFilms = () => {
    setKeyForRender(keyForRender + 1)
  }

  const checkIdFavoriteArray = () => {
    if (idFavoriteFilms) {
        actionArrayIds([...idFavoriteFilms])
    } else {
      return null
    }
  }

  const addFavoriteFilm = (id) => {

    let idsFilms = JSON.parse(localStorage.getItem('id'))
    let mainArray 

    if (idsFilms.indexOf(id) === -1) {
      mainArray = [...idsFilms, id]
    } else {
      mainArray = idsFilms.filter(myId => myId !== id)
      deleteFavoriteFilm(id)
    }

    localStorage.setItem('id', JSON.stringify(mainArray) )
    actionArrayIds([...mainArray])
  }

  const setFavoriteFilm =  (arrayId) => {
    try {
      arrayId.forEach(id => {
          fetch( 'https://api.themoviedb.org/3/account/20556095/favorite', {
          method : "POST",
          headers : {
            'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `,
            'Content-Type' : 'application/json'
          },  
          body : JSON.stringify({ "media_type": "movie", "media_id": id, "favorite": true })

        })

        .then((response) => response.json())
        .catch((error) => console.error('Ошибка:', error));        
      });
        
    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteFavoriteFilm =  (id) => {
    try {
      
      fetch( 'https://api.themoviedb.org/3/account/20556095/favorite', {
      method : "POST",
      headers : {
        'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `,
        'Content-Type' : 'application/json'
      },  
      body : JSON.stringify({ "media_type": "movie", "media_id": id, "favorite": false })

      })

      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Ошибка:', error));        
      
      
    }
    catch (error) {
      console.log(error)
    }
  }  

  const goBack = () => {
    window.history.back()
    actionFavorite(!state.favorite)
  }

  

  const actionPopular = () => {
      dispatch(
        {
          type : "SET_SORT",
          sort : {
              popular : true,
              rating : false
          }
      }
      ) 


  }

  const actionReting = () => {
      dispatch(
        {
          type : "SET_SORT",
          sort : {
              popular : false,
              rating : true
          }        
      }
      ) 

  }

  const actionIndex = (index) => {

    setKeyForRender(keyForRender + 1)

    dispatch(
      {
        type : "INDEX_FILM",
          indexFilms :  {
              firstIndex : index*3-3,
              lastIndex : index*3
          }
      }
    ) 

  }

  const actionRerenderKey = () => {
      dispatch(
        {type : "KEY_RERENDER"}
      ) 
  }

  const actionFilmInfo = (array) => {
      dispatch(
        {
          type : "SET_FILM_INFO",
          filmInfo : {
              title : array.original_title,
              year : array.release_date,
              info : array.overview
          }
        }      
      ) 
  }

  const actionFilmSearch = (film) => {
      dispatch(
        {
            type : "SET_FILM_SEARCH",
            filmSearch : film
        }
      ) 

  }

  const actionValue = (value) => {
      dispatch(
        {
          type : "SET_VALUE",
          value : value
        }
      ) 
  }

  const actionOpenRequest = (openArray) => {
      dispatch(
        {
            type : "SET_OPEN",
            open : {
                request : !openArray.request,
                confirm : false,
                user : false
            }
        }
      ) 

  }

  const actionOpenConfirm = (openArray) =>  {
      dispatch(
        {
            type : "SET_OPEN",
            open : {
                request : false,
                confirm : !openArray.confirm,
                user : false
            }
        }
      ) 

  }

  const actionFavorite = ( favorite) => {
      dispatch({
            type : "SET_FAVORITE", 
            favorite : favorite
        }) 


  }

  const actionsCurrentId = (id) => {
      dispatch(
        {
          type : 'SET_CURRENT_ID',
          currentId : id
        }   
      ) 

  }

  const actionArrayIds = (currentIds) => {
      dispatch(
        {
            type : 'SET_ARRAY_ID',
            ids : [...currentIds]
        }
      ) 

  }

  const actionFavoriteFilms = (array) => {
      dispatch(
        {
            type : 'SET_FAVORITE_FILMS',
            favoritFilms :  array
        }
      ) 

  }

  const actionIdDelete = (id) => {
      dispatch(
        {
            type : 'SET_ID_DELTE',
            idDelete : id
        }
      )

  }

  const contextValue = {
    rerenderFilms,
    goBack,
    actionPopular,
    actionReting,
    actionIndex,
    actionRerenderKey,
    actionFilmInfo,
    actionFilmSearch,
    actionValue,
    actionOpenRequest,
    actionOpenConfirm,
    actionFavorite,
    actionsCurrentId,
    actionArrayIds,
    actionFavoriteFilms,
    actionIdDelete,
    dispatch,
    addFavoriteFilm,
    state
  }

  return (

    <Context.Provider value={contextValue}>
      <BrowserRouter>
        <Head openWindow={actionOpenRequest} />
        <Box>
          <div key={keyForRender}>
            <Filter />

            <div style={{display: 'inline-block'}} key={keyForRender} >
                    {
                      <Routes>
                        <Route path='/searchFilms' element={<CardList api={apiSerach} />}/>
                        <Route path='/popular' element={<CardList api={apiPopular} />}/>
                        <Route path='/rating' element={<CardList api={apiRating}/>}/>
                        <Route path='/detailsFilm' element={<FilmInfo />}/>
                        <Route path='/favorites' element={<CardList api={apiFavorite}/>}/>
                      </Routes>            
                    }               
          
            </div>                  
          </div> 
        </Box>
      {/* {
        writeModalWindow(state.open)
      } */}
      
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App;
