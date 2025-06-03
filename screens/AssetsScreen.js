import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import api from '../utils/api'

export default function AssetsScreen({ navigation }) {
  const [balances, setBalances] = useState([])

  useEffect(() => {
    api.get('/wallet/balances').then(r=>setBalances(r.data))
  }, [])

  return (
    <View style={{ flex:1, backgroundColor:'#fff', padding:16 }}>
      <Text style={{ fontSize:20, fontWeight:'bold', marginBottom:16 }}>Balances</Text>
      <FlatList
        data={balances}
        keyExtractor={b=>b.asset}
        renderItem={({item})=>(
          <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:12 }}>
            <Text>{item.asset}</Text>
            <Text>{item.available}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={()=>navigation.navigate('Deposit')}
        style={{ marginTop:16, backgroundColor:'#7C3AED', padding:12, borderRadius:8 }}
      >
        <Text style={{ color:'#fff', textAlign:'center' }}>Deposit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>navigation.navigate('Withdraw')}
        style={{ marginTop:12, backgroundColor:'#38BDF8', padding:12, borderRadius:8 }}
      >
        <Text style={{ color:'#fff', textAlign:'center' }}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  )
}
