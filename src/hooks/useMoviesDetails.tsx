import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Cast, CreditsMovie } from "../interfaces/creditsInterface";
import { MovieDetails } from "../interfaces/movieInterface";

interface IMovieDetails{
  isLoading:boolean;
  movieFull?:MovieDetails;
  cast:Cast[];
}

export const useMoviesDetails = (movieID:number) => {
  
  const [state, setState] = useState<IMovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: []
  });

  const getMovieDetails = async() => {
    const movieDetailsPromise = movieDB.get<MovieDetails>(`/${movieID}`);
    const castPromise = movieDB.get<CreditsMovie>(`/${movieID}/credits`);
    const [movieDetailResp, castPromiseResp] = await Promise.all([movieDetailsPromise, castPromise]);
    setState({
      isLoading: false,
      movieFull: movieDetailResp.data,
      cast: castPromiseResp.data.cast
    })
  }

  useEffect(() => {
    getMovieDetails();
  }, [])
  
  return {
    ...state
  }

}

