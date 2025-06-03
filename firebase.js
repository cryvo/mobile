// mobile-app/firebase.js
import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey:    'YOUR_FIREBASE_API_KEY',
  authDomain:'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  // …the rest of your web app config
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
