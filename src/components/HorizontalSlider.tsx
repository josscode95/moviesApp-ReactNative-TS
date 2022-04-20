import React from 'react'
import { FlatList, Text, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { MovieCard } from './MovieCard';

interface IHorizontalSlider{
  title?:string;
  movies:Movie[];
}

export const HorizontalSlider = ({title, movies}:IHorizontalSlider) => {
  return (
    <View style={{
      height: (title) ? 260 : 220
    }}>
      {
        title &&
        <Text style={{fontSize: 30, fontWeight: 'bold', marginLeft: 10}}>{title}</Text>
      }
      <FlatList 
        data={movies}
        renderItem={({item}:any) => (
          <MovieCard movie={item} width={140} height={200} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        />
    </View>
  )
}
