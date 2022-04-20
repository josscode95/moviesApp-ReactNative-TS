import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDBPlaying } from "../interfaces/movieInterface";

export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [moviesActually, setMoviesActually] = useState<Movie[]>([])

  const getMovies = async() => {
    const result = await movieDB.get<MovieDBPlaying>('/now_playing')
    setMoviesActually(result.data.results);
    setIsLoading(false);
  }

  //cuando la aplicacion es cargada 
  useEffect(() => {
    getMovies();
  }, [])
    
  return {
    moviesActually,
    isLoading
  }

}