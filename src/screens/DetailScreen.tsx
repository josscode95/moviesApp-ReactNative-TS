import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMoviesDetails } from '../hooks/useMoviesDetails';
import { MovieDetails } from '../components/MovieDetails';

const { height } = Dimensions.get('screen');

interface IDetailScreen extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({route, navigation}:IDetailScreen) => {

  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  const { isLoading, movieFull, cast } = useMoviesDetails(movie.id);

  return (
    <ScrollView>
      <View style={styles.cardContainer}>
        <View style={styles.imageBorder}>
          <Image 
            source={{uri}}
            style={styles.cardImage}
          />
        </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{ movie.original_title }</Text>
        <Text style={styles.title}>{ movie.title }</Text>
      </View>
      {
        isLoading 
          ? <ActivityIndicator size={35} color="gray" style={{marginTop: 20}} />
          : <MovieDetails movieFull={movieFull!} cast={cast}/>
      }
      {/* Boton para cerrar */}
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
        >
          <Icon 
            color="white"
            name="arrow-back-outline"
            size={60}
          />
        </TouchableOpacity>
      </View>
      
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cardContainer:{
    width: '100%',
    height: height * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    elevation: 10,
  },
  imageBorder:{
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  cardImage:{
    flex: 1
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  subTitle:{
    fontSize: 18,
    opacity: 0.8
  }, 
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  backButton:{
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 10
  }
});
