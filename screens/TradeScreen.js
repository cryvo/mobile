import React, { useState } from 'react'
import { View, Text } from 'react-native'
import OrderForm from '../components/OrderForm'
import OrderBook from '../components/OrderBook'

export default function TradeScreen() {
  const [pair] = useState('BTC/USD')
  return (
    <View style={{ flex:1, backgroundColor:'#fff', padding:16 }}>
      <Text style={{ fontSize:18, fontWeight:'bold' }}>{pair}</Text>
      <OrderBook pair={pair} style={{ flex:1, marginVertical:16 }} />
      <OrderForm pair={pair} />
    </View>
  )
}
