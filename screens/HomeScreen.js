import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import CTAButton from '../components/CTAButton'
import AssetCarousel from '../components/AssetCarousel'

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex:1, backgroundColor:'#F3F4F6', padding:16 }}>
      <Text style={{ fontSize:24, fontWeight:'bold', marginBottom:16 }}>Welcome to Cryvo</Text>
      <CTAButton title="Earn Products" onPress={() => {}} />
      <CTAButton title="NFT Launchpad" onPress={() => {}} style={{ marginTop:12 }} />
      <Text style={{ fontSize:20, fontWeight:'bold', marginVertical:16 }}>Your Assets</Text>
      <AssetCarousel />
    </ScrollView>
  )
}
