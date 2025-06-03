import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import useSWR from 'swr'
import api from '../utils/api'

export default function AnalyticsScreen() {
  const { data } = useSWR('/admin/settings/analytics-metrics', api)
  return (
    <ScrollView style={{padding:16}}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Platform Analytics</Text>
      <Text>{JSON.stringify(data,null,2)}</Text>
    </ScrollView>
  )
}
