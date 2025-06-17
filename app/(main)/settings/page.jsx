'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/services/superbaseClient'

function Settings() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/') // Redirect to home
  }

  return (
    <div className='p-5 bg-white flex items-center justify-between rounded-md'>
      <h2 className='font-bold'>Logout From Here</h2>
      <Button variant={'outline'} onClick={handleLogout}>Log Out</Button>
    </div>
  )
}

export default Settings
