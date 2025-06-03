import React from 'react'
import { View, Text, Switch } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SettingsScreen() {
  const [dark, setDark] = React.useState(false)

  useEffect(() => {
    AsyncStorage.getItem('theme').then(v=>setDark(v==='dark'))
  }, [])

  const toggle = () => {
    const newVal = !dark
    setDark(newVal)
    AsyncStorage.setItem('theme', newVal?'dark':'light')
  }

  return (
    <View style={{ flex:1, backgroundColor:'#fff', padding:16 }}>
      <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:16 }}>
        <Text>Dark Theme</Text>
        <Switch value={dark} onValueChange={toggle} />
      </View>
      <Text>Language</Text>
      {/* add picker */}
    </View>
  )
}
