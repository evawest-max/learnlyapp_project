"use client"
import { useState } from "react";
import "./movieCard.css";
// import { Cartcontext } from "../context folder/appContext";
// import { useContext } from "react";





 function Movie({id, image, title, release_date, actors}){
    // const cart= useContext(Cartcontext)
    
    const [buttonState, newbuttonState]= useState(<button onClick={addWatchlist} className="movie-button">Add to Watch list</button>)
    function addWatchlist(){
        
        newbuttonState(<button onClick={removeFromWatchList} className="movie-button">Remove from watch list</button>)
    }

    function removeFromWatchList(){
        newbuttonState(<button onClick={addWatchlist} className="movie-button">Add to Watch list</button>)
    }
    return(
       
            <div className="movie-item"  >
                <img src={image} alt="rice" width="200px" height="500px"/>
                <p className="movie-name">{title}</p>
                <p className="movie-actor">{actors}</p>
                <div>{release_date}</div>
                {buttonState}
            </div>
        
    )
}
export default Movie