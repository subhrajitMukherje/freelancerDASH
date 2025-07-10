'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { supabase } from '@/lib/supabase'

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  loading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTheme = async () => {
      if (session?.user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('theme')
          .eq('id', session.user.id)
          .single()

        if (profile?.theme) {
          setTheme(profile.theme)
          document.documentElement.classList.toggle('dark', profile.theme === 'dark')
        }
      } else {
        // Load from localStorage for non-authenticated users
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (savedTheme) {
          setTheme(savedTheme)
          document.documentElement.classList.toggle('dark', savedTheme === 'dark')
        }
      }
      setLoading(false)
    }

    loadTheme()
  }, [session])

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')

    if (session?.user?.id) {
      await supabase
        .from('profiles')
        .update({ theme: newTheme })
        .eq('id', session.user.id)
    } else {
      localStorage.setItem('theme', newTheme)
    }
  }

  const value = {
    theme,
    toggleTheme,
    loading,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}