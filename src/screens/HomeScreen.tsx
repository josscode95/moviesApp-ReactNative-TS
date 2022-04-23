import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';

import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../hooks/useMovies'
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';

const { width } = Dimensions.get('window');

export const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upcomming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  
  const { setMainColors } = useContext(GradientContext)

  const getCardColors = async(index:number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [ primary = '', secondary = ''] = await getImageColors(uri);
    setMainColors({primary, secondary});
  }

  useEffect(() => {
    if(upcomming.length > 0){
      getCardColors(0);
    }
  }, [upcomming])
  

  if(isLoading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="red" size={80}/>
      </View>
    )
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          <View style={{height: 440}}>
            <Carousel 
              data={upcomming}
              renderItem={({item}:any) => <MovieCard movie={item} />}
              sliderWidth={width}
              itemWidth={300}
              inactiveSlideOpacity={0.8}
              onSnapToItem={index => getCardColors(index)}
            />
          </View>
          <HorizontalSlider title="En Cine" movies={nowPlaying}/>
          <HorizontalSlider title="Populares" movies={popular}/>
          <HorizontalSlider title="Top Rated" movies={topRated}/>
        </View>
      </ScrollView>
    </GradientBackground>
  )
}
