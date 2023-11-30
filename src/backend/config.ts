import firebase from "firebase";
import "firebase/firestore";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    });
}

export default firebase;
