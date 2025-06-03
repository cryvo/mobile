// mobile-app/screens/WalletScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function WalletScreen() {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    fetch('https://yourdomain/api/v1/wallet/balances', {
      headers:{ Authorization: 'Bearer YOUR_TOKEN' }
    })
      .then(r=>r.json())
      .then(setBalances);
  }, []);

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:20, marginBottom:8 }}>Wallet Balances</Text>
      <FlatList data={balances} keyExtractor={(b,i)=>i+''}
        renderItem={({item})=>
          <Text>{item.asset}: {item.balance}</Text>
        } />
    </View>
  );
}
