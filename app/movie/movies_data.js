import React from 'react'
const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': 'da48636025msh78cf0074cc194e5p1e62e5jsn35f5af2315e8',
    		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    	}
    };
async function getmovies(){
    const res= await fetch('https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1', options)

    return res.json()
}

export default async function Movies_data() {
    const movies= await getmovies()
    console.log(movies)
  return (
    <div>Movies_data</div>
  )
}
