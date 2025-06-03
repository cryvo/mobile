// mobile-app/screens/CMSPageScreen.js

import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import useSWR from 'swr'
import api from '../utils/api'

export default function CMSPageScreen({ route }) {
  const { slug } = route.params
  const { data, error } = useSWR(() => `/pages/${slug}`, api.get)

  if (error) return <View style={styles.center}><Text>Error loading page.</Text></View>
  if (!data) return <View style={styles.center}><Text>Loading page…</Text></View>

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      {data.config.map((block, i) => {
        if (block.type === 'markdown') {
          return <Text key={i} style={styles.paragraph}>{block.contentText || block.content}</Text>
        }
        if (block.type === 'cta') {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => Linking.openURL(block.href)}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>{block.text}</Text>
            </TouchableOpacity>
          )
        }
        return <Text key={i}>{JSON.stringify(block)}</Text>
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#F3F4F6' },
  center: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { fontSize:24, fontWeight:'bold', marginBottom:12 },
  paragraph: { marginBottom:12, fontSize:16, lineHeight:22 },
  cta: { backgroundColor:'#7C3AED', padding:12, borderRadius:4, alignItems:'center', marginVertical:8 },
  ctaText: { color:'#fff', fontWeight:'600' },
})
