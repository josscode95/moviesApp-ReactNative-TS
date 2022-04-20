import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../hooks/useMovies'

export const HomeScreen = () => {

  const { moviesActually, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();

  if(isLoading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="red" size={80}/>
      </View>
    )
  }

  return (
    <View style={{marginTop: top + 20}}>
      <MovieCard 
        movie={moviesActually[8]}
      />
    </View>
  )
}
