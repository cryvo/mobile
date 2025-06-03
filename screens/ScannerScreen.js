import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function ScannerScreen({ navigation, route }) {
  const { onScan } = route.params
  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync()
      .then(({ status }) => setHasPermission(status === 'granted'))
  }, [])

  if (hasPermission === null) return <Text>Requesting camera permission…</Text>
  if (hasPermission === false) return <Text>No camera access</Text>

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={({ data }) => {
          onScan(data)
          navigation.goBack()
        }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex:1 }
})
