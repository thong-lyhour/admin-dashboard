'use client'
import Checkbox from '@/components/form/input/Checkbox'
import Input from '@/components/form/input/InputField'
import Label from '@/components/form/Label'
import Button from '@/components/ui/button/Button'
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '@/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { login } from '@/lib/auth'

export const LoginSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: 'admin',
      password: 'admin',
    },
    onSubmit: async (values: any) => {
      // `values` contains email & password. You can use provider to connect user
      
      const isAuth = await login(values);
  
      if(isAuth) {
        router.replace('/')
      }
      // await createAuthCookie();
    },
    validationSchema: LoginSchema,
  })

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{' '}
                  </Label>
                  <Input
                    placeholder="info@gmail.com"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                  />
                  {formik.errors.username &&
                    typeof formik.errors.username === 'string' && (
                      <div className="text-red-500">
                        {formik.errors.username}
                      </div>
                    )}
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{' '}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      name="password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                     
                    </span>
                    {formik.errors.password &&
                    typeof formik.errors.password === 'string' && (
                      <div className="text-red-500">
                        {formik.errors.password}
                      </div>
                    )}
                    
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center font-medium gap-2 rounded-lg transition bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3.5 text-sm cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {''}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
