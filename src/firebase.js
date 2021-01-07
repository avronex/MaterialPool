import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD1M7fshIZGdaPmZ1MANA7Gc1PhRqW89l0",
    authDomain: "materialpool-86511.firebaseapp.com",
    projectId: "materialpool-86511",
    storageBucket: "materialpool-86511.appspot.com",
    messagingSenderId: "422680912850",
    appId: "1:422680912850:web:ca3bc8467a4a169b5b5e0b",
    measurementId: "G-1KE5L3QQP3"
  }

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore