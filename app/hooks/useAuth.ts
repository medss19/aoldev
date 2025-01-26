'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export function useAuth() {
  const { data: session, status } = useSession()
  console.log("Login Step 3");
  const login = async (email: string, password: string) => {
    console.log("Login Step 4");
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action:'login',email, password }),
    })
    if (response.ok) {
      console.log("Login Step 5");
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      return !result?.error
    } 
  }

  const signup = async (email: string, password: string) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action:'signup',email, password }),
    })

    if (response.ok) {
      return login(email, password)
    }
    return false
  }

  const logout = () => signOut()

  return { session, status, login, signup, logout }
}

