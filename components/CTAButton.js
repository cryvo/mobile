import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function CTAButton({ title, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor:'#7C3AED',
          padding:16,
          borderRadius:8,
        },
        style
      ]}
    >
      <Text style={{ color:'#fff', textAlign:'center', fontWeight:'bold' }}>{title}</Text>
    </TouchableOpacity>
  )
}
