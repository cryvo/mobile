import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import TradingViewChart from '../components/TradingViewChart'
import DepthChart from '../components/DepthChart'

export default function MarketDetailScreen({ navigation }) {
  const symbol = navigation.getParam('symbol', 'BTC/USD')
  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <Text style={{ fontSize:20, fontWeight:'bold', padding:16 }}>{symbol}</Text>
      <TradingViewChart symbol={symbol} style={{ height:240 }} />
      <DepthChart symbol={symbol} style={{ height:200, marginTop:16 }} />
    </View>
  )
}
