import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { supabase } from '../supabaseClient'
import { oAuth as Oauth } from './components/oAuth'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function initializeAuth() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError
        setSession(session)
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })

        return () => subscription?.unsubscribe()
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signInWithProvider = useCallback(async (provider) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({ provider })
      if (error) throw error
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return (
      <Oauth 
        loading={loading}
        error={error}
        onProviderSignIn={signInWithProvider}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Welcome {session.user.email}</h2>
        <button
          onClick={signOut}
          className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          disabled={loading}
        >
          {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  )
}

export default App

// Memwuz-renfe8-cefweb