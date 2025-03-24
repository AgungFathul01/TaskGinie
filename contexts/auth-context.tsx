"use client"

import { createContext, useContext, useState } from "react"

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Agung Fathul",
    email: "agungfathul14@upi.edu",
    password: "Password123!",
    role: "Admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@taskgenie.demo",
    password: "SarahJ2023!",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "David Chen",
    email: "david.chen@taskgenie.demo",
    password: "ChenDev2023!",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    email: "maria.r@taskgenie.demo",
    password: "MariaR2023!",
    role: "Designer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Alex Thompson",
    email: "alex.t@taskgenie.demo",
    password: "AlexT2023!",
    role: "Marketing",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Guest user
const guestUser = {
  id: "guest",
  name: "Guest User",
  email: "guest@taskgenie.demo",
  role: "Guest",
  avatar: "/placeholder.svg?height=40&width=40",
}

// Default user (for when no one is logged in)
const defaultUser = {
  id: "default",
  name: "Demo User",
  email: "demo@taskgenie.demo",
  role: "Demo",
  avatar: "/placeholder.svg?height=40&width=40",
}

// Create auth context
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser)
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Always authenticated for demo

  // Login function (optional, for UI demonstration)
  const login = async (email, password) => {
    const foundUser = mockUsers.find((user) => user.email === email && user.password === password)

    if (foundUser) {
      setUser(foundUser)
      setIsAuthenticated(true)
      return true
    }

    return false
  }

  // Guest login function (optional, for UI demonstration)
  const loginAsGuest = async () => {
    setUser(guestUser)
    setIsAuthenticated(true)
    return true
  }

  // Logout function (optional, for UI demonstration)
  const logout = () => {
    setUser(defaultUser)
    // We don't set isAuthenticated to false since we want to keep access
  }

  // Register function (optional, for UI demonstration)
  const register = async (userData) => {
    // Just simulate registration
    setUser({
      id: "new-user",
      name: userData.name,
      email: userData.email,
      role: "User",
      avatar: "/placeholder.svg?height=40&width=40",
    })
    setIsAuthenticated(true)
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        loginAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

