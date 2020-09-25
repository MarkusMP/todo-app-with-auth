import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC83sl3uLELnmDJ3-YQ2lekfh1s8IT7jDE",
    authDomain: "todo-app-3c28e.firebaseapp.com",
    databaseURL: "https://todo-app-3c28e.firebaseio.com",
    projectId: "todo-app-3c28e",
    storageBucket: "todo-app-3c28e.appspot.com",
    messagingSenderId: "793211753230",
    appId: "1:793211753230:web:ea2f6d8477dea9a22dbd5f"
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