import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import { RootStackParams } from '../navigation/Navigation'

interface IDetailScreen extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({route}:IDetailScreen) => {

  const movie = route.params;
  
  
  return (
    <View>
      <Text>Detail Screen</Text>
    </View>
  )
}
