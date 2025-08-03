import {
  Analytics,
  getAnalytics,
  logEvent as logAnalyticsEvent,
} from "firebase/analytics"
import { initializeApp } from "firebase/app"
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check"
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth"
import { getFirestore, initializeFirestore } from "firebase/firestore"
//import { getFunctions } from "firebase/functions"

const app = initializeApp({
  apiKey: "AIzaSyDTUkiDi_OVrHPDoKjAB2RCw5AaF7b0fBo",
  authDomain: "auth.e-ingatlanugyvedek.hu",
  //authDomain: "e-ingatlanugyvedek.firebaseapp.com",
  projectId: "e-ingatlanugyvedek",
  storageBucket: "e-ingatlanugyvedek.appspot.com",
  messagingSenderId: "33465661845",
  appId: "1:33465661845:web:f932abcb1b2dc136235e9c",
  measurementId: "G-VYQVHRGQVG",
})

let a: Analytics

if (typeof window !== "undefined") {
  initializeFirestore(app, {
    ignoreUndefinedProperties: true,
    experimentalAutoDetectLongPolling: true,
  })

  setPersistence(getAuth(app), browserSessionPersistence)

  a = getAnalytics()
  //check hostname too
  if (
    process.env.NODE_ENV !== "production" ||
    window.location.hostname === "localhost"
  ) {
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }

  const _appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      "6LfDRkopAAAAAKUfhyLOjaawtdKUyoOaYtmQjCbY"
    ),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
  })
}

export const clientApp = app
export const clientFirestore = getFirestore(app)
export const clientAuth = getAuth(app)
////export const clientFunctions = getFunctions(app, "europe-west6")

export const logEvent = function (name: string, params?: any) {
  logAnalyticsEvent(a, name, params)
}
