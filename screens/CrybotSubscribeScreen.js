import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import api from '../utils/api'

export default function CrybotSubscribeScreen() {
  const [plans, setPlans] = useState([])
  useEffect(()=> api.get('/crybot/plans').then(r=>setPlans(r.data)), [])

  const subscribe = id =>
    api.post(`/crybot/subscribe/${id}`).then(()=>alert('Subscribed!'))

  return (
    <View style={{ flex:1,padding:16 }}>
      <FlatList
        data={plans}
        keyExtractor={p=>p.id.toString()}
        renderItem={({item})=>(
          <View style={{ padding:12, backgroundColor:'#fff', borderRadius:8, marginBottom:12 }}>
            <Text style={{fontWeight:'bold'}}>{item.name}</Text>
            <Text>${item.price_usd}/mo</Text>
            <Button title="Subscribe" onPress={()=>subscribe(item.id)} color="#7C3AED"/>
          </View>
        )}
      />
    </View>
  )
}
