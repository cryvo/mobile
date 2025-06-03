import React from 'react'
import { View, Text, Image } from 'react-native'

export default function BalanceCard({ asset, available, icon }) {
  return (
    <View style={{ width:120, padding:12, backgroundColor:'#fff', borderRadius:8, marginRight:12 }}>
      <Image source={icon} style={{ width:32, height:32, marginBottom:8 }} />
      <Text style={{ fontWeight:'bold' }}>{asset}</Text>
      <Text>{available}</Text>
    </View>
  )
}
