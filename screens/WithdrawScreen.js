import React, { useState } from 'react'
import { View, Text, Picker, TextInput, Button, Alert } from 'react-native'
import api from '../utils/api'

export default function WithdrawScreen() {
  const [asset, setAsset] = useState('BTC')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')

  const submit = () => {
    api.post('/crypto/withdraw', { asset, to_address: to, amount: parseFloat(amount) })
      .then(()=>Alert.alert('Withdrawal queued'))
      .catch(()=>Alert.alert('Error'))
  }

  return (
    <View style={{ flex:1, backgroundColor:'#fff', padding:16 }}>
      <Picker selectedValue={asset} onValueChange={setAsset}>
        <Picker.Item label="BTC" value="BTC" />
        <Picker.Item label="ETH" value="ETH" />
      </Picker>
      <TextInput
        placeholder="Destination Address"
        value={to}
        onChangeText={setTo}
        style={{ borderWidth:1, borderColor:'#ccc', padding:8, marginVertical:12 }}
      />
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{ borderWidth:1, borderColor:'#ccc', padding:8, marginBottom:12 }}
      />
      <Button title="Submit" color="#7C3AED" onPress={submit} />
    </View>
  )
}
