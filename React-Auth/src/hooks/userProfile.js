import { useState, useEffect } from 'react'
import prisma from '../lib/prisma'

export function useProfile(session) {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        if (!session?.user) return

        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        })

        if (!user) {
          // Create profile if it doesn't exist
          const newUser = await prisma.user.create({
            data: {
              email: session.user.email,
              fullName: session.user.user_metadata?.full_name,
              avatarUrl: session.user.user_metadata?.avatar_url
            }
          })
          setProfile(newUser)
        } else {
          setProfile(user)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [session])

  return { profile, loading, error }
}