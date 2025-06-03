import React, { useState, useEffect } from 'react'
import { View, Text, Picker, TextInput, Button } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import api from '../utils/api'

export default function DepositScreen() {
  const [asset, setAsset] = useState('BTC')
  const [address, setAddress] = useState('')

  useEffect(() => {
    api.get(`/crypto/deposit-address?asset=${asset}`)
       .then(r=>setAddress(r.data.address))
  }, [asset])

  return (
    <View style={{ flex:1, backgroundColor:'#fff', padding:16 }}>
      <Picker selectedValue={asset} onValueChange={setAsset}>
        <Picker.Item label="BTC" value="BTC" />
        <Picker.Item label="ETH" value="ETH" />
        {/* add more */}
      </Picker>
      {address ? (
        <View style={{ alignItems:'center', marginTop:24 }}>
          <QRCode value={address} size={200} />
          <Text style={{ marginTop:12 }}>{address}</Text>
        </View>
      ) : <Text>Loading address…</Text>}
    </View>
  )
}
