import axios from 'axios'

//url: https://api.themoviedb.org/3/movie/now_playing?api_key=32833ec8855ceb4b8cb57252c451237a&language=pt-BR
//base: https://api.themoviedb.org/3/

const api = axios.create({
  baseURL:'https://api.themoviedb.org/3/'
});

export default api;