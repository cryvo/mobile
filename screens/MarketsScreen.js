import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import API from '../utils/api';
import SparklineChart from '../components/SparklineChart';

export default function MarketsScreen() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    API.get('/markets').then(r => setMarkets(r.data));
  }, []);

  const renderItem = ({ item }) => {
    const [oracle, setOracle] = useState(null);
    useEffect(() => {
      API.get(`/chainlink/price?symbol=${item.symbol}`).then(r => setOracle(r.data));
    }, []);
    
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.symbol}</Text>
        <Text style={styles.cell}>${item.price.toFixed(2)}</Text>
        <Text style={styles.cell}>
          {oracle ? `$${oracle.price.toFixed(2)}` : '...'}
        </Text>
        <View style={styles.sparkCell}>
          <SparklineChart data={item.sparkline.map((p,i)=>({time:i,price:p}))} />
        </View>
        <Text style={[styles.cell, item.change24h>=0?styles.up:styles.down]}>
          {item.change24h.toFixed(2)}%
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={markets}
      keyExtractor={m => m.symbol}
      ListHeaderComponent={() => (
        <View style={styles.headerRow}>
          {['Symbol','Price','Oracle','Trend','24h'].map(h=>(
            <Text key={h} style={styles.headerCell}>{h}</Text>
          ))}
        </View>
      )}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  headerRow:  { flexDirection:'row', padding:8, backgroundColor:'#eee' },
  headerCell: { flex:1, fontWeight:'bold' },
  row:        { flexDirection:'row', padding:8, borderBottomWidth:1, borderColor:'#ddd' },
  cell:       { flex:1 },
  sparkCell:  { flex:2 },
  up:         { color:'green' },
  down:       { color:'red' },
});
