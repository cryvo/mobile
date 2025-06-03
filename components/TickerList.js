import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import api from '../utils/api'

export default function TickerList() {
  const [tickers, setTickers] = useState([])

  useEffect(() => {
    api.get('/ticker').then(r=>setTickers(r.data))
    const iv = setInterval(()=>api.get('/ticker').then(r=>setTickers(r.data)), 5000)
    return ()=>clearInterval(iv)
  }, [])

  return (
    <ScrollView horizontal style={{ backgroundColor:'#F3F4F6', padding:8 }}>
      {tickers.map(t=>(
        <View key={t.symbol} style={{ marginRight:16 }}>
          <Text style={{ fontWeight:'bold' }}>{t.symbol}</Text>
          <Text>{t.price}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
