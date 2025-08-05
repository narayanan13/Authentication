import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, []);

  let user = session?.user?.email;


  const signout = async () => {
    const { error } = await supabase.auth.signOut();

  }

  const signUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  if (!session) {
    return (
      <div>
        <button onClick={signUp}>Sign-In with Google</button>
      </div>
    )
  }else {
    return (
    <div>
      <h2>Welcome {user}</h2>
      <button onClick={signout}>Sign Out</button>
    </div>
    )
  }

}

export default App

// Memwuz-renfe8-cefweb