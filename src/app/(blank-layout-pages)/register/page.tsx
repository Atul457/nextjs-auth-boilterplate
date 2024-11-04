// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Register from '@/views/Register'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register your account'
}

const RegisterPage = () => {
  return <Register />
}

export default RegisterPage
