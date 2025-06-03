// mobile-app/screens/CMSListScreen.js

import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import useSWR from 'swr'
import api from '../utils/api'

export default function CMSListScreen({ navigation }) {
  const { data: pages = [], error } = useSWR('/pages', api.get)

  if (error) return <View style={styles.center}><Text>Error loading pages.</Text></View>
  if (!pages.length) return <View style={styles.center}><Text>Loading pages…</Text></View>

  return (
    <FlatList
      data={pages}
      keyExtractor={item => item.slug}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(item.title, { slug: item.slug })}
        >
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  center: { flex:1, justifyContent:'center', alignItems:'center' },
  item: { padding:16, borderBottomWidth:1, borderColor:'#ccc' },
  text: { fontSize:16 },
})
