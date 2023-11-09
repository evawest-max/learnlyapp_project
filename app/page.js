"use client"
import "./searchBar.css"
import { useRef, useState } from "react"
import { useContext } from "react"
import { Cartcontext } from "./context folder/appContext"
import movies from "./moviesData"
import Movie from "./movie/movieCard"

// const url = 'https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'da48636025msh78cf0074cc194e5p1e62e5jsn35f5af2315e8',
// 		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


export default function Home() {
  const movie=useContext(Cartcontext)
    let [moviesMaped, setmoviesMaped]=useState(movies.map((items, index)=>{
        
        return(
            <Movie key={items.id} id={items.id} image={items.image} title={items.title} release_date={items.release_date} actors={items.actors}/>
        ) 
    }))
    let inputRef= useRef()

    function findMovie(){
        const filteredMoviesMaped= movies.filter((items)=>{
            return items.title.toLocaleLowerCase().includes(inputRef.current.value.toLocaleLowerCase())
        })
        console.log(filteredMoviesMaped)
        
        setmoviesMaped(filteredMoviesMaped.map((items, index)=>{            
            return(
              <Movie key={items.id} id={items.id} image={items.image} title={items.title} release_date={items.release_date} actors={items.actors}/>
            ) 
        }))
    }

    

    

    return(
        <div className="searchcontainer">
            <div className="SearchbarContainer" style={movie.changeINdex}>
                <input onChange={findMovie} ref={inputRef} type="text" placeholder="Filter movies by title"/>
            </div>   
            <div className="filterAndMovieContainer">
                <div className="movie-container">
                    {moviesMaped}
                </div>
            </div>
        </div>
    )
  
}
