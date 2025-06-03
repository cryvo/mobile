import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import api from '../utils/api'

export default function MtTradesScreen() {
  const [trades, setTrades] = useState([])

  useEffect(() => {
    api.get('/mt/trade-events')
       .then(r=>setTrades(r.data))
  }, [])

  return (
    <View style={{flex:1,padding:16}}>
      <FlatList
        data={trades}
        keyExtractor={t=>t.id.toString()}
        renderItem={({item})=>
          <Text style={{marginBottom:8}}>
            [{new Date(item.created_at).toLocaleTimeString()}] 
            {item.symbol} {item.type} @ {item.price} ({item.volume})
          </Text>
        }
      />
    </View>
  )
}
