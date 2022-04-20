import { NavigationProp, useNavigation } from '@react-navigation/core';
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movieInterface'

interface IMovieCard{
  movie:Movie;
  height?:number;
  width?:number;
}

export const MovieCard = ({movie, height = 420, width = 300}:IMovieCard) => {

  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const navigation:any = useNavigation()

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('DetailScreen', movie)}
      activeOpacity={0.8}
      style={{
        width,
        height,
        marginHorizontal: 8
      }}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{uri}}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image:{
    flex: 1,
    borderRadius: 18,
  },
  imageContainer:{
    flex: 1,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    elevation: 10,
  }
});