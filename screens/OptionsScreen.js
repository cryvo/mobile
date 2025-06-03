// mobile-app/screens/OptionsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Picker, TextInput, Button } from 'react-native';
import api from '../utils/api';

export default function OptionsScreen() {
  const [chain, setChain] = useState([]);
  const [series, setSeries] = useState();
  const [qty, setQty] = useState('1');
  const [quote, setQuote] = useState(null);
  const [price, setPrice] = useState('');
  const [side, setSide] = useState('buy');

  useEffect(() => { api.get('/options/chain').then(r=>setChain(r.data)); }, []);

  const getQuote = () =>
    api.post('/options/quote', { series_id: series, quantity: +qty })
       .then(r=>setQuote(r.data.premium));

  const place = () =>
    api.post('/options/order', { series_id: series, quantity:+qty, price:+price, side })
       .then(()=>alert('Order placed'));

  return (
    <View style={{ flex:1, padding:16 }}>
      <Picker selectedValue={series} onValueChange={setSeries}>
        {chain.map(s=>(
          <Picker.Item key={s.id} label={s.symbol} value={s.id} />
        ))}
      </Picker>
      <TextInput value={qty} onChangeText={setQty} keyboardType="numeric" placeholder="Qty" style={{borderWidth:1,marginVertical:8,padding:8}}/>
      <Button title="Get Quote" onPress={getQuote} color="#7C3AED" />
      {quote !== null && <Text style={{ marginVertical:8 }}>Premium: {quote}</Text>}
      <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="Price" style={{borderWidth:1,marginVertical:8,padding:8}}/>
      <View style={{ flexDirection:'row', justifyContent:'space-around', marginVertical:8 }}>
        <Button title="Buy" onPress={()=>setSide('buy')} color={side==='buy'?'#22C55E':'#AAA'} />
        <Button title="Sell" onPress={()=>setSide('sell')} color={side==='sell'?'#EF4444':'#AAA'} />
      </View>
      <Button title="Place Order" onPress={place} color="#6366F1" />
    </View>
  );
}
