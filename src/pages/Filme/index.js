import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css'

import { toast } from 'react-toastify';

import api from '../../services/api';



export default function Filme(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function LoadMovie(){

      await api.get(`/movie/${id}`,{
        params:{
          api_key: '32833ec8855ceb4b8cb57252c451237a',
          language: 'pt_BR',
        }
      }).then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/", { replace: true });
        return
      });

    }

    LoadMovie();

    return () => { }
  },[ navigate, id ])


  function saveMovie(){
    const minhaLista = localStorage.getItem("@primeFlix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === movie.id)

    if(hasFilme){
      toast.warn("Esse filme já está na sua lista !")
      return;
    }

    filmesSalvos.push(movie);
    localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso")

  }

  if(loading){
    return(
      <div className='filme-info'>
        <h1> Carregando detalhes...</h1>
      </div>
    )
  }

  return(
    <div className='filme-info'>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />

      <h3>Sinopse:</h3>
      <span>{movie.overview}</span>

      <strong>Avaliação: {movie.vote_average} /10</strong>

      <div className='area-buttons'>
        <button onClick={saveMovie} >Salvar</button>
        <button>
          <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${movie.title} Trailer`}> Trailer </a>
        </button>
      </div>
    </div>

  )
}