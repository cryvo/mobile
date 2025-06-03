import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import api from '../utils/api'

export default function OrderForm({ pair }) {
  const [side, setSide] = useState('buy')
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')

  const submit = () => {
    api.post('/orders', { pair, type: side, price: parseFloat(price), amount: parseFloat(amount) })
      .then(()=>alert('Order placed'))
      .catch(()=>alert('Error'))
  }

  return (
    <View>
      <View style={{ flexDirection:'row', justifyContent:'space-around', marginBottom:12 }}>
        <TouchableOpacity onPress={()=>setSide('buy')}>
          <Text style={{ color: side==='buy'?'#22C55E':'#000' }}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSide('sell')}>
          <Text style={{ color: side==='sell'?'#EF4444':'#000' }}>Sell</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={{ borderWidth:1, borderColor:'#ccc', padding:8, marginVertical:6 }}
      />
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{ borderWidth:1, borderColor:'#ccc', padding:8, marginBottom:12 }}
      />
      <TouchableOpacity onPress={submit} style={{ backgroundColor:'#7C3AED', padding:12, borderRadius:8 }}>
        <Text style={{ color:'#fff', textAlign:'center' }}>Place {side}</Text>
      </TouchableOpacity>
    </View>
  )
}
