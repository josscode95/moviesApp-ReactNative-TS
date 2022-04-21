import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDBResponse } from "../interfaces/movieInterface";

interface IuseMovies{
  nowPlaying:Movie[];
  popular:Movie[];
  topRated:Movie[];
  upcomming:Movie[];
}

export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [moviesState, setMoviesState] = useState<IuseMovies>({
    nowPlaying:[],
    popular:[],
    topRated:[],
    upcomming:[]
  });

  const getMovies = async() => {
    
    const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing')
    const popularPromise = movieDB.get<MovieDBResponse>('/popular')
    const topRatedPromise = movieDB.get<MovieDBResponse>('/top_rated')
    const upcomingPromise = movieDB.get<MovieDBResponse>('/upcoming')

    const resp = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise]);

    setMoviesState({
      nowPlaying: resp[0].data.results,
      popular: resp[1].data.results,
      topRated: resp[2].data.results,
      upcomming: resp[3].data.results,
    })
    
    setIsLoading(false);
  }

  //cuando la aplicacion es cargada 
  useEffect(() => {
    getMovies();
  }, [])
    
  return {
    ...moviesState,
    isLoading
  }

}