// mobile-app/screens/FuturesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

export default function FuturesScreen({ navigation }) {
  const [positions, setPositions] = useState([]);
  const [book, setBook] = useState({ bids:[], asks:[] });

  useEffect(() => {
    fetch('https://yourdomain/api/v1/futures/positions')
      .then(r=>r.json())
      .then(setPositions);
    fetch('https://yourdomain/api/v1/futures/order-book/BTC/USD')
      .then(r=>r.json())
      .then(setBook);
  }, []);

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:20 }}>Futures Positions</Text>
      <FlatList data={positions} keyExtractor={p=>p.id+''}
        renderItem={({item})=>
          <Text>{item.pair} • {item.side} • {item.size} @ {item.entryPrice}</Text>
        } />
      <Button title="Go to Chart" onPress={()=>navigation.navigate('Chart',{ pair:'BTC/USD', type:'futures' })}/>
      <Text style={{ marginTop:16 }}>Order Book</Text>
      <FlatList data={book.bids} keyExtractor={(_,i)=>i+''}
        renderItem={({item})=><Text>B {item.price}×{item.amount}</Text>} />
      <FlatList data={book.asks} keyExtractor={(_,i)=>i+''}
        renderItem={({item})=><Text>A {item.price}×{item.amount}</Text>} />
    </View>
  );
}
