// File: mobile-app/screens/SwapScreen.js

import React, { useState } from 'react'
import { View, Text, TextInput, Picker, Button, StyleSheet, ActivityIndicator } from 'react-native'
import useSWR from 'swr'
import api from '../utils/api'

export default function SwapScreen() {
  const [from, setFrom] = useState('USDT')
  const [to, setTo] = useState('BTC')
  const [amount, setAmount] = useState('')
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchQuote = async () => {
    if (!amount) return
    try {
      const res = await api.get(`/swap/quote?from=${from}&to=${to}&amount=${amount}`)
      setQuote(res.data)
    } catch {}
  }

  const submit = async () => {
    if (!quote) return
    setLoading(true)
    try {
      await api.post('/swap', { from, to, amount })
      alert('Swap executed!')
      setAmount(''); setQuote(null)
    } catch {
      alert('Swap failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Token Swap</Text>
      <View style={styles.row}>
        <Picker selectedValue={from} style={styles.picker} onValueChange={setFrom}>
          <Picker.Item label="USDT" value="USDT" /><Picker.Item label="BTC" value="BTC" />
        </Picker>
        <Picker selectedValue={to} style={styles.picker} onValueChange={setTo}>
          <Picker.Item label="BTC" value="BTC" /><Picker.Item label="USDT" value="USDT" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        onBlur={fetchQuote}
      />
      {quote && (
        <View style={styles.quoteBox}>
          <Text>Estimate: {quote.toAmount}</Text>
          <Text>Rate: {quote.rate}</Text>
        </View>
      )}
      {loading
        ? <ActivityIndicator />
        : <Button title="Swap" onPress={submit} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#F3F4F6' },
  title: { fontSize:20, fontWeight:'bold', marginBottom:12 },
  row: { flexDirection:'row', marginBottom:12 },
  picker: { flex:1, height:44 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:4, padding:8, marginBottom:12 },
  quoteBox: { padding:12, backgroundColor:'#fff', borderRadius:4, marginBottom:12 },
})
