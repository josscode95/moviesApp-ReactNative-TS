import axios from "axios";

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '1c803b269a873f31ac641b075e34739d',
    language: 'es-ES'
  }
});

export default movieDB;