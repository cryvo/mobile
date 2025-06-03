// mobile-app/screens/LoginScreen.js
import React, { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import firebase from '../firebase'
import api from '../utils/api'

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('')
  const [code,  setCode]  = useState('')
  const [confirm, setConfirm] = useState(null)

  // 1️⃣ Send OTP
  const sendOtp = async () => {
    try {
      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(phone)
      setConfirm(confirmation)
      Alert.alert('OTP sent')
    } catch (e) {
      Alert.alert('Failed to send OTP', e.message)
    }
  }

  // 2️⃣ Confirm code & send to backend
  const confirmCode = async () => {
    try {
      await confirm.confirm(code)
      const idToken = await firebase.auth().currentUser.getIdToken()
      // Link/verify on your backend
      await api.post('/auth/verify-phone', { id_token: idToken })
      Alert.alert('Phone verified')
      navigation.navigate('Home')
    } catch (e) {
      Alert.alert('Invalid code', e.message)
    }
  }

  return (
    <View style={{ padding:16 }}>
      {!confirm ? (
        <>
          <TextInput
            placeholder="+1234567890"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={{borderWidth:1,marginBottom:12,padding:8}}
          />
          <Button title="Send OTP" onPress={sendOtp} color="#7C3AED"/>
        </>
      ) : (
        <>
          <TextInput
            placeholder="123456"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            style={{borderWidth:1,marginBottom:12,padding:8}}
          />
          <Button title="Confirm OTP" onPress={confirmCode} color="#7C3AED"/>
        </>
      )}
    </View>
  )
}
import * as LocalAuth from 'expo-local-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage'

async function tryBiometricLogin(navigation) {
  const savedToken = await AsyncStorage.getItem('token')
  if (!savedToken) return false
  const bio = await LocalAuth.authenticateAsync({
    promptMessage: 'Unlock Cryvo',
    fallbackLabel: 'Use Passcode',
  })
  if (bio.success) {
    navigation.navigate('Home')  // skip email/phone login
    return true
  }
  return false
}

// In your component’s useEffect:
useEffect(() => {
  tryBiometricLogin(navigation)
}, [])
import { GoogleSignin } from '@react-native-google-signin/google-signin'

// configure once, e.g. in App.js or firebase.js
GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_OAUTH_WEB_CLIENT_ID',
})

// then in your component:
async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices()
    const { idToken } = await GoogleSignin.signIn()
    // send to your backend for verification / account creation
    const res = await api.post('/auth/google', { id_token: idToken })
    await AsyncStorage.setItem('token', res.data.token)
    navigation.navigate('Home')
  } catch (e) {
    Alert.alert('Google Sign-In error', e.message)
  }
}

// and add a button:
<Button title="Sign in with Google" onPress={signInWithGoogle} />

import appleAuth, {
  AppleButton,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'

async function signInWithApple() {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    })
    const { identityToken } = appleAuthRequestResponse
    if (!identityToken) throw new Error('Apple Sign-In failed')
    const res = await api.post('/auth/apple', { id_token: identityToken })
    await AsyncStorage.setItem('token', res.data.token)
    navigation.navigate('Home')
  } catch (e) {
    Alert.alert('Apple Sign-In error', e.message)
  }
}

// render in JSX:
<AppleButton
  buttonStyle={AppleButton.Style.WHITE_OUTLINE}
  buttonType={AppleButton.Type.SIGN_IN}
  style={{ width:200, height:44, marginTop:12 }}
  onPress={signInWithApple}
/>
