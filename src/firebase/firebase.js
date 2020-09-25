import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "*",
    authDomain: "*",
    databaseURL: "*",
    projectId: "*",
    storageBucket: "*",
    messagingSenderId: "*",
    appId: "*"
};

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()

export const auth = firebase.auth()

export const createUserDocument = async (userAuth, AdditionalData) => {
    if (!userAuth) return
    const userRef = firebase.firestore().doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()
    if (!snapShot.exists) {
        const { email, uid } = userAuth
        const createdAt = new Date()
        try {
            userRef.set({
                email,
                createdAt,
                uid,
                ...AdditionalData
            })
        } catch (error) {
            console.log(error)
        }
    }
    return userRef
}
