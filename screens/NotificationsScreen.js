import React, { useEffect, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import api from '../utils/api'

export default function NotificationsScreen() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    api.get('/notifications').then(r=>setNotes(r.data))
  }, [])

  return (
    <View style={{ flex:1, backgroundColor:'#fff', padding:16 }}>
      <FlatList
        data={notes}
        keyExtractor={(n,i)=>i.toString()}
        renderItem={({item})=>(
          <View style={{ marginBottom:12 }}>
            <Text style={{ fontWeight:'bold' }}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text style={{ color:'#888', fontSize:12 }}>{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  )
}
