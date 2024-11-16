import { useEffect, useState } from 'react';
import './favoritos.css';
import {Link} from 'react-router-dom';

import { toast } from 'react-toastify';


export default function Favoritos(){
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem('@primeFlix');
    setMovies(JSON.parse(minhaLista) || [])

  },[]);

  function excluirFilme(id){
    let filtroFilmes = movies.filter((item) => {
      return (item.id !== id)
    })


    setMovies(filtroFilmes);
    localStorage.setItem('@primeFlix', JSON.stringify(movies))
    toast.success("Filme removido com sucesso")

  }


  return(
    <div className='meus-filmes'>
      <h1>Meus filmes</h1>

      {movies.length === 0 && <span>Você não possui nenhum filme salvo :( </span> }
      <ul>
        {movies.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.title} </span>
              <div>
                <Link to={`/filme/${item.id}`} > Ver detalhes </Link>
                <button onClick={ () => excluirFilme(item.id)} >Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}