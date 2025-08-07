import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { supabase } from '../supabaseClient'
import { oAuth as Oauth } from './components/oAuth'
import { useProfile } from './hooks/userProfile'

function App() {
  const { session, loading, error, signOut } = Oauth()
  const { profile } = useProfile(session)

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return <Oauth />
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          {profile?.avatarUrl && (
            <img 
              src={profile.avatarUrl}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              Welcome {profile?.fullName || session.user.email}
            </h2>
            <p className="text-gray-500 text-sm">{profile?.email}</p>
          </div>
        </div>
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