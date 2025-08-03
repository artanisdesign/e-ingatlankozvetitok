"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { getAnalytics, setUserId, setUserProperties } from "firebase/analytics"
import { User } from "firebase/auth"

import { clientAuth as auth, logEvent } from "@/app/lib/clientFirebaseApps"

export interface AuthContextProps {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
})

export const AuthProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthContextProps>({
    user: null,
    loading: true,
  })

  const onChange = useCallback(async (user: User | null) => {
    if (user && !user.isAnonymous) {
      //console.log("AuthProvider login", user)
      setState((prev) => ({
        ...prev,
        user,
        loading: false,
      }))
      setUserProperties(getAnalytics(), {
        email: user.email,
      })
      setUserId(getAnalytics(), user.uid)
      //console.log("AuthProvider claims", user)
    } else {
      // Logout
      //console.log("AuthProvider logout")
      setUserProperties(getAnalytics(), {
        email: null,
      })
      setUserId(getAnalytics(), null)

      setState({
        user: null,
        loading: false,
      })
    }
  }, [])

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [onChange])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
