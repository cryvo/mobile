import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import api from '../utils/api'

export default function OrderBook({ pair, style }) {
  const [bids, setBids] = useState([])
  const [asks, setAsks] = useState([])

  useEffect(() => {
    api.get(`/orderbook?symbol=${pair}`).then(r=>{
      setBids(r.data.bids.slice(0,5))
      setAsks(r.data.asks.slice(0,5))
    })
  }, [pair])

  return (
    <View style={style}>
      <Text style={{ fontWeight:'bold' }}>Bids</Text>
      <FlatList
        data={bids}
        keyExtractor={(_,i)=>i.toString()}
        renderItem={({item})=>(
          <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
            <Text>{item[0]}</Text><Text>{item[1]}</Text>
          </View>
        )}
      />
      <Text style={{ fontWeight:'bold', marginTop:12 }}>Asks</Text>
      <FlatList
        data={asks}
        keyExtractor={(_,i)=>i.toString()}
        renderItem={({item})=>(
          <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
            <Text>{item[0]}</Text><Text>{item[1]}</Text>
          </View>
        )}
      />
    </View>
  )
}
