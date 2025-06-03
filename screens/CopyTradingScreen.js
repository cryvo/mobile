// mobile-app/screens/CopyTradingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import api from '../utils/api';

export default function CopyTradingScreen() {
  const [masters, setMasters] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => { api.get('/copy/masters').then(r=>setMasters(r.data)); }, []);

  const follow = id =>
    api.post(`/copy/masters/${id}/follow`, { amount:+amount })
       .then(()=>alert('Following!'));

  return (
    <View style={{ flex:1, padding:16 }}>
      <TextInput 
        placeholder="Amount per trade"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{borderWidth:1,marginBottom:12,padding:8}}
      />
      <FlatList
        data={masters}
        keyExtractor={m=>m.id.toString()}
        renderItem={({item})=>(
          <View style={{ padding:12, backgroundColor:'#fff', borderRadius:8, marginBottom:12 }}>
            <Text style={{fontWeight:'bold'}}>{item.user.name} ({item.alias})</Text>
            <Button title="Follow" onPress={()=>follow(item.id)} color="#7C3AED" />
          </View>
        )}
      />
    </View>
  );
}
