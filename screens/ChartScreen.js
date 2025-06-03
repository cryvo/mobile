// mobile-app/screens/ChartScreen.js

import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import api from '../utils/api'

export default function ChartScreen() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/analytics/transactions/daily')
      .then(res => {
        setData(res.data)     // expects [{ date: '2025-05-01', total: 1234.56 }, …]
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // extract labels & values
  const labels = data.map(item => item.date)
  const values = data.map(item => item.total)

  return (
    <View style={{ flex:1, padding:16, backgroundColor:'#F3F4F6' }}>
      <LineChart
        data={{
          labels,
          datasets: [{ data: values }]
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#F3F4F6',
          backgroundGradientFrom: '#F3F4F6',
          backgroundGradientTo: '#F3F4F6',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,    // primary purple
          labelColor: () => `rgba(0, 0, 0, 0.6)`,
          style: { borderRadius: 16 },
          propsForDots: { r: '3', strokeWidth: '2', stroke: '#6366F1' } // accent
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  )
}
