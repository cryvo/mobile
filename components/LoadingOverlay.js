import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export default function LoadingOverlay() {
  return (
    <View style={{
      ...StyleSheet.absoluteFillObject,
      backgroundColor:'rgba(0,0,0,0.3)',
      justifyContent:'center',
      alignItems:'center'
    }}>
      <ActivityIndicator size="large" color="#7C3AED" />
    </View>
  )
}
