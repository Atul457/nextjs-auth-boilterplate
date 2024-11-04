'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports

// MUI Imports
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

// Component Imports
import Link from '@components/Link'
import CustomTextField from '@core/components/mui/TextField'

import CommonButton from '@/components/common/CommonButton'
import AuthWrapper from '@/components/page-wise/auth/wrapper/AuthWrapper'
import { schemas } from '@/schemas/index.schemas'
import { utils } from '@/utils/utils'
import clsx from 'clsx'
import AuthFooter from './auth/AuthFooter'

import { signIn } from 'next-auth/react'
import { useModal } from '@/contexts/ModalProvider'

import { useSearchParams } from 'next/navigation'
import { Box } from '@mui/material'

type FormData = (typeof schemas.common.login)['__outputType']

const Login = () => {
  const params = useSearchParams()

  // States
  const [loading, setLoading] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [token] = useState(params.get('token') ?? null)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemas.common.login),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // Hooks
  const modalContext = useModal()

  useEffect(() => {
    if (token) {
      modalContext.openModal({
        type: 'resetPassword',
        props: {
          visible: true,
          token
        }
      })
    }
  }, [token])

  // Functions

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (credentials: FormData) => {
    setLoading(true)
    try {
      const data = await signIn('credentials', {
        data: JSON.stringify(credentials),
        type: 'login',
        redirect: false
      })

      if (data?.error) {
        utils.toast.error({ message: utils.error.getMessage(data?.error) })
        setLoading(false)
      } else {
        window.location.href = '/'
      }
    } catch (error: any) {
      utils.toast.error({ message: utils.error.getMessage(error) })
      setLoading(false)
      console.error(error)
    }
  }

  const onForgotPasswordClick = () => {
    modalContext.openModal({
      type: 'forgotPassword',
      props: {
        visible: true
      }
    })
  }

  return (
    <AuthWrapper title='Welcome back to'>
      <form
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 max-md:h-full'
      >
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Email'
              placeholder='Enter your email'
              {...(errors.email && {
                error: true,
                helperText: utils.string.capitalize(errors.email.message, {
                  capitalizeAll: false
                })
              })}
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              variant='filled'
              label='Password'
              sx={{
                paddingInlineEnd: 0
              }}
              placeholder='Enter your password'
              type={isPasswordShown ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={clsx(isPasswordShown ? 'tabler-eye-off' : 'tabler-eye', '!text-[#28282866]')} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              {...(errors.password && {
                error: true,
                helperText: utils.string.capitalize(errors.password.message, {
                  capitalizeAll: false
                })
              })}
            />
          )}
        />

        <Box justifyContent='flex-end' display='flex'>
          <Typography
            className='cursor-pointer custom-link primary'
            onClick={() => onForgotPasswordClick()}
            fontSize={12}
            textAlign='right'
            component='div'
            color='primary.main'
            fontWeight={600}
          >
            Forgot Password?
          </Typography>
        </Box>

        <AuthFooter>
          <CommonButton loading={loading} label='Sign In' />
          <Typography
            variant='body1'
            component='div'
            className='flex justify-center items-center flex-wrap'
            fontWeight={400}
            color='customColors.textGray60'
          >
            Don’t have an account? Please&nbsp;
            <Typography component={Link} href='/register' color='hyperlink.main' variant='inherit' fontWeight={600}>
              Sign Up
            </Typography>
          </Typography>
        </AuthFooter>
      </form>
    </AuthWrapper>
  )
}

export default Login
