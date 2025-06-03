// File: mobile-app/screens/FuturesTradeScreen.js

import React, { useState } from 'react'
import {
  View, Text, FlatList, TextInput,
  TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView
} from 'react-native'
import useSWR from 'swr'
import api from '../utils/api'
import { WebView } from 'react-native-webview'

export default function FuturesTradeScreen({ route }) {
  const { symbol = 'BTCUSDT' } = route.params || {}
  const [side, setSide] = useState('buy')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [leverage, setLeverage] = useState('10')
  const [loadingOrder, setLoadingOrder] = useState(false)

  const { data: book, error: bookError } = useSWR(
    `/futures/orderbook?symbol=${symbol}`,
    api.get,
    { refreshInterval: 2000 }
  )

  const submitOrder = async () => {
    setLoadingOrder(true)
    try {
      await api.post('/futures/order', {
        symbol,
        side,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        leverage: parseInt(leverage),
        type: 'limit'
      })
      setPrice(''); setQuantity(''); setLeverage('10')
      alert('Futures order placed')
    } catch {
      alert('Error placing futures order')
    } finally {
      setLoadingOrder(false)
    }
  }

  const renderOrderBook = () => {
    if (bookError) return <Text style={styles.error}>Error loading order book.</Text>
    if (!book) return <ActivityIndicator style={{ marginTop: 20 }} />
    return (
      <View style={styles.orderBook}>
        <View style={styles.sideColumn}>
          <Text style={styles.columnHeader}>Bids</Text>
          <FlatList
            data={book.bids}
            keyExtractor={(_,i)=>`bid${i}`}
            renderItem={({ item })=>(
              <View style={styles.row}>
                <Text style={styles.bid}>{item[0]}</Text>
                <Text style={styles.qty}>{item[1]}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.sideColumn}>
          <Text style={styles.columnHeader}>Asks</Text>
          <FlatList
            data={book.asks}
            keyExtractor={(_,i)=>`ask${i}`}
            renderItem={({ item })=>(
              <View style={styles.row}>
                <Text style={styles.ask}>{item[0]}</Text>
                <Text style={styles.qty}>{item[1]}</Text>
              </View>
            )}
          />
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{symbol} Futures</Text>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `
              <html><body style="margin:0">
                <div id="tv"></div>
                <script src="https://s3.tradingview.com/tv.js"></script>
                <script>
                  new TradingView.widget({
                    container_id: "tv",
                    width:"100%",height:300,
                    symbol:"${symbol}FUT",
                    interval:"15",theme:"Light"
                  });
                </script>
              </body></html>`
          }}
          style={{ height: 300 }}
        />
      </View>

      {/* Order Book */}
      {renderOrderBook()}

      {/* Order Form */}
      <View style={styles.form}>
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, side==='buy'&&styles.activeBuy]}
            onPress={()=>setSide('buy')}
          ><Text style={side==='buy'?styles.toggleTextActive:styles.toggleText}>Buy</Text></TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, side==='sell'&&styles.activeSell]}
            onPress={()=>setSide('sell')}
          ><Text style={side==='sell'?styles.toggleTextActive:styles.toggleText}>Sell</Text></TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TextInput
          style={styles.input}
          placeholder="Leverage (x)"
          keyboardType="numeric"
          value={leverage}
          onChangeText={setLeverage}
        />
        {loadingOrder
          ? <ActivityIndicator style={{ marginTop: 12 }} />
          : (
            <TouchableOpacity style={styles.submit} onPress={submitOrder}>
              <Text style={styles.submitText}>
                {`Submit ${side.toUpperCase()}`}
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#F3F4F6' },
  title: { fontSize:20, fontWeight:'bold', margin:16 },
  chartContainer: { marginHorizontal:16, borderRadius:8, overflow:'hidden' },
  orderBook: { flexDirection:'row', margin:16 },
  sideColumn: { flex:1, marginHorizontal:4 },
  columnHeader: { fontWeight:'600', marginBottom:4 },
  row: { flexDirection:'row', justifyContent:'space-between', paddingVertical:2 },
  bid: { color:'#16a34a' },
  ask: { color:'#dc2626' },
  qty: { color:'#6b7280' },
  form: { margin:16, backgroundColor:'#fff', borderRadius:8, padding:16 },
  toggle: { flexDirection:'row', marginBottom:12 },
  toggleBtn: {
    flex:1, padding:8, alignItems:'center', borderWidth:1, borderColor:'#ccc'
  },
  activeBuy: { backgroundColor:'#10b981', borderColor:'#10b981' },
  activeSell:{ backgroundColor:'#ef4444', borderColor:'#ef4444' },
  toggleText: { color:'#374151' },
  toggleTextActive:{ color:'#fff', fontWeight:'600' },
  input: {
    borderWidth:1, borderColor:'#ccc', borderRadius:4,
    padding:8, marginBottom:12, backgroundColor:'#fff'
  },
  submit: {
    backgroundColor:'#7C3AED', padding:12,
    borderRadius:4, alignItems:'center'
  },
  submitText: { color:'#fff', fontWeight:'600' },
  error: { color:'#dc2626', textAlign:'center', marginTop:16 }
})
