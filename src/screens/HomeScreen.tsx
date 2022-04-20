import React from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';

import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../hooks/useMovies'

const { width } = Dimensions.get('window');

export const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upcomming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();

  if(isLoading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="red" size={80}/>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20}}>
        <View style={{height: 440}}>
          <Carousel 
            data={upcomming}
            renderItem={({item}:any) => <MovieCard movie={item} />}
            sliderWidth={width}
            itemWidth={300}
            inactiveSlideOpacity={0.8}
          />
        </View>
        <HorizontalSlider title="En Cine" movies={nowPlaying}/>
        <HorizontalSlider title="Populares" movies={popular}/>
        <HorizontalSlider title="Top Rated" movies={topRated}/>
      </View>
    </ScrollView>
  )
}
