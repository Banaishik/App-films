import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext } from 'react';
import Context from "../Contex";


function FavoriteButton({currentId }) {

    const dataContext = useContext(Context)

    return (
        <>
            <FavoriteIcon style={{cursor: 'pointer'}} color='error' onClick={() => dataContext.addFavoriteFilm(currentId)} />
        </>
    );
}

export default FavoriteButton