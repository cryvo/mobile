// mobile-app/screens/SpotScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

export default function SpotScreen({ navigation }) {
  const [orderBook, setOrderBook] = useState({ bids:[], asks:[] });

  useEffect(() => {
    fetch('https://yourdomain/api/v1/spot/order-book/BTC/USD')
      .then(r=>r.json())
      .then(setOrderBook);
  }, []);

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:20, marginBottom:8 }}>Spot BTC/USD</Text>
      <Button title="Go to Chart" onPress={()=>navigation.navigate('Chart',{ pair:'BTC/USD' })}/>
      <Text style={{ marginTop:16 }}>Bids:</Text>
      <FlatList data={orderBook.bids} keyExtractor={(_,i)=>i+''}
        renderItem={({item})=> <Text>{item.price} × {item.amount}</Text>} />
      <Text style={{ marginTop:16 }}>Asks:</Text>
      <FlatList data={orderBook.asks} keyExtractor={(_,i)=>i+''}
        renderItem={({item})=> <Text>{item.price} × {item.amount}</Text>} />
    </View>
  );
}
