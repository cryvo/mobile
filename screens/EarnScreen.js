// mobile-app/screens/EarnScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import api from '../utils/api';

export default function EarnScreen() {
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    api.get('/earn/products').then(r => setProducts(r.data));
  }, []);

  const subscribe = id =>
    api.post(`/earn/products/${id}/subscribe`, { amount: +amount })
       .then(()=>alert('Subscribed!'));

  return (
    <View style={{ flex:1, padding:16 }}>
      <FlatList
        data={products}
        keyExtractor={p=>p.id.toString()}
        renderItem={({item})=>(
          <View style={{ marginBottom:16, padding:12, backgroundColor:'#fff', borderRadius:8 }}>
            <Text style={{fontWeight:'bold'}}>{item.name}</Text>
            <Text>Rate: {item.annual_rate}% {item.term_days ? `${item.term_days}d` : '(flex)'}</Text>
            <TextInput
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              style={{ borderWidth:1, borderColor:'#ccc', marginTop:8, padding:8, borderRadius:4 }}
            />
            <Button title="Subscribe" onPress={()=>subscribe(item.id)} color="#7C3AED" />
          </View>
        )}
      />
    </View>
  );
}
