// mobile-app/screens/SignUpScreen.js
import React, { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import firebase from '../firebase'
import api from '../utils/api'

export default function SignUpScreen({ navigation }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      await user.sendEmailVerification()
      Alert.alert('Verification email sent')
      // Optionally save user in your backend
      const idToken = await user.getIdToken()
      await api.post('/auth/verify-email', { id_token: idToken })
      navigation.navigate('Login')
    } catch (e) {
      Alert.alert('Sign-up failed', e.message)
    }
  }

  return (
    <View style={{ padding:16 }}>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{borderWidth:1,marginBottom:12,padding:8}}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{borderWidth:1,marginBottom:12,padding:8}}
      />
      <Button title="Sign Up" onPress={signUp} color="#7C3AED"/>
    </View>
  )
}
