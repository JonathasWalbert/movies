import {useEffect, useState} from 'react'
import api from "../../services/api";
import './home.css'


import { Link } from 'react-router-dom'


export default function Home(){
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    async function loadMovies(){
      const res = await api.get("movie/now_playing",{
        params:{
          api_key: '32833ec8855ceb4b8cb57252c451237a',
          language: 'pt_BR',
          page:1
        }
      })

      setMovies(res.data.results.slice(0,10))
      setLoading(false);
    }

    loadMovies();
      

  },[])

  if (loading){
    return(
      <div className='loading'>
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return(
    <div className='container'>
      <div className='lista-filmes'>
        {movies.map((movie) => {
          return(
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
              <Link to={`/filme/${movie.id}`} > Acessar </Link>
            </article>
          )
        })}
      </div>
      
    </div>

  )
}