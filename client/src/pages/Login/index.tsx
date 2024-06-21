import React from 'react'
import { LoginForm } from './LoginForm'
import { RiTwitterXLine } from 'react-icons/ri'

export const Login: React.FC = () => {
    
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <RiTwitterXLine className="mx-auto h-8 w-auto"></RiTwitterXLine>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
