import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Github } from 'lucide-react'
import { supabase } from '../../supabaseClient'

export function oAuth({ loading, onProviderSignIn, error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in using:</p>
        </div>

        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => onProviderSignIn('google')}
            className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            {loading ? 'Loading...' : 'Google'}
          </button>

          <button
            onClick={() => onProviderSignIn('github')}
            className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            <Github className="w-5 h-5" />
            {loading ? 'Loading...' : 'GitHub'}
          </button>
        </div>

        {/* Divider */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Email Form */}
        <div className="mt-6">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4F46E5',
                    brandAccent: '#4338CA',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  )
}