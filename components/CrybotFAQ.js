import React from 'react'
import { View, Text } from 'react-native'
import useSWR from 'swr'
import api from '../utils/api'

export default function CrybotFAQ() {
  const { data: faq = [] } = useSWR('/admin/settings/crybot-faq', api)
  return (
    <View style={{ marginTop:16 }}>
      <Text style={{ fontSize:18, fontWeight:'bold', marginBottom:8 }}>CryBot FAQ</Text>
      {faq.map((item, i) => (
        <View key={i} style={{ marginBottom:12 }}>
          <Text style={{ fontWeight:'600' }}>{item.q}</Text>
          <Text style={{ marginTop:4, color:'#555' }}>{item.a}</Text>
        </View>
      ))}
    </View>
  )
}
