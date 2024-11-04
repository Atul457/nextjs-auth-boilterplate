'use client'

import { utils } from '@/utils/utils'
import ProfilePictureBox from '@/views/register/step-two/ProfilePictureBox'
import { Box, IconButton, InputAdornment, Typography } from '@mui/material'
import { ChangeEventHandler, useEffect, useState } from 'react'

// Third-party Imports
import CustomTextField from '@/@core/components/mui/TextField'
import Loader from '@/components/Loader'
import CommonButton from '@/components/common/CommonButton'
import { useModal } from '@/contexts/ModalProvider'
import { IUser } from '@/models/user.model'
import { schemas } from '@/schemas/index.schemas'
import { UserService } from '@/services/client/UserService'
import { useAppDispatch } from '@/store/slices/hooks/useAppDispatch'
import { useAppSelector } from '@/store/slices/hooks/useAppSelector'
import { userActions, userSelectors } from '@/store/slices/user/user.slice'
import AuthFooter from '@/views/auth/AuthFooter'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type IProfilePicture = {
  src: string
  file: File
} | null

type FormData = (typeof schemas.common.updateProfileSchemaWithType)['__outputType']

const USER_TYPES = utils.CONST.USER.TYPES

const Profile = () => {
  const [updating, setUpdating] = useState(false)
  const [converting, setConverting] = useState(false)
  const [profilePictureUpdating, setProfilePictureUpdating] = useState(false)
  const [profilePicture, setProfilePicture] = useState<IProfilePicture>(null)

  // Hooks
  const router = useRouter()
  const session = useSession()
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSelectors.user)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    setValue,
    watch
  } = useForm<FormData>({
    resolver: yupResolver(schemas.common.updateProfileSchemaWithType),
    defaultValues: {
      type: USER_TYPES.INDIVIDUAL,
      firstName: '',
      organizationName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      phoneNumber_: ''
    }
  })

  const isSubmitted_ = isSubmitted

  // Hooks
  const modalContext = useModal()

  useEffect(() => {
    if (!user) {
      return
    }

    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      type: user.type,
      address: user.address ?? '',
      phoneNumber: user.phoneNumber ?? '',
      phoneNumber_: user.phoneNumber ?? '',
      organizationName: user.organizationName ?? ''
    })

    if (user.profilePicture) {
      setProfilePicture({
        src: user.profilePicture,
        file: new File([], '')
      })
    }
  }, [user])

  // Functions

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      setUpdating(true)
      delete data.phoneNumber_
      const userService = new UserService()
      const response = await userService.update(data)

      if (response.data) {
        dispatch(userActions.updateUser(response.data ?? {}))
        await session.update({
          info: response.data
        })
      }

      utils.toast.success({ message: utils.error.getMessage(response.message) })
      setUpdating(false)
    } catch (error: any) {
      setUpdating(false)
      console.error(error)
    }
  }

  const onRemoveProfilePicture = () => {
    setProfilePicture(null)
  }

  const uploadProfilePicture = async (file: File) => {
    setProfilePictureUpdating(true)
    try {
      const us = new UserService()
      const response = await us.uploadUserProfilePicture({
        file
      })
      dispatch(userActions.updateUser(response.data ?? {}))
      await session.update({
        info: response.data
      })
      utils.toast.success({ message: response.message ?? '' })
    } catch (error: any) {
      console.error(error)
      utils.toast.error({ message: utils.error.getMessage(error) })
    }
    setProfilePictureUpdating(false)
  }

  const deleteAccountButtonClick = async (bypass = false) => {
    if (!bypass) {
      return modalContext.openModal({
        type: 'alert',
        props: {
          heading: 'Alert',
          description: 'Are you sure you want to delete your account?',
          onOkClick: async () => {
            await deleteAccountButtonClick(true)
          },
          visible: true,
          status: 'idle',
          okButtonText: 'Yes'
        }
      })
    }

    try {
      const us = new UserService()
      await us.delete()
      await signOut({
        redirect: false
      })
      dispatch(userActions.resetUser())
      router.push('/login')
    } catch (error) {
      utils.toast.error({
        message: utils.error.getMessage(error)
      })
    }
  }

  const profilePictureChange: ChangeEventHandler<HTMLInputElement> = async e => {
    try {
      let file: File | null = null
      await utils.helpers.user.profilePictureChange({
        e,
        setProfilePicture: (profilePicture: IProfilePicture) => {
          file = profilePicture?.file ?? null
          setProfilePicture(profilePicture)
        },
        setConverting
      })

      if (file) {
        await uploadProfilePicture(file)
      }
    } catch (error) {
      utils.toast.error({ message: utils.error.getMessage(error) })
      setProfilePictureUpdating(false)
      console.error(error)
    }
  }

  const onUpdatePasswordClick = () => {
    modalContext.openModal({
      type: 'updatePassword',
      props: {
        visible: true
      }
    })
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            marginBottom: 10
          }}
        >
          <ProfilePictureBox
            loading={converting || profilePictureUpdating}
            onChange={profilePictureChange}
            onRemove={onRemoveProfilePicture}
            src={profilePicture?.src ?? null}
          />
        </Box>

        <form
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 max-md:h-full'
        >
          <CustomTextField fullWidth label='Email' disabled={true} value={user?.email} placeholder='Enter your email' />

          <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='First Name'
                  className='w-[calc(50%-8px)]'
                  placeholder='Enter your first name'
                  {...(errors.firstName && {
                    error: true,
                    helperText: utils.string.capitalize(errors.firstName.message, {
                      capitalizeAll: false
                    })
                  })}
                />
              )}
            />

            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Last Name'
                  className='w-[calc(50%-8px)]'
                  placeholder='Enter your last name'
                  {...(errors.lastName && {
                    error: true,
                    helperText: utils.string.capitalize(errors.lastName.message, {
                      capitalizeAll: false
                    })
                  })}
                />
              )}
            />
          </Box>

          {[USER_TYPES.GOVT_ORGANISATION, USER_TYPES.CORPORATE_EMPLOYER].includes(watch('type') as IUser['type']) ? (
            <>
              <Controller
                name='organizationName'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Organization'
                    placeholder='Enter your organization name'
                    {...(errors.organizationName && {
                      error: true,
                      helperText: utils.string.capitalize(errors.organizationName.message, {
                        capitalizeAll: false
                      })
                    })}
                  />
                )}
              />
            </>
          ) : null}

          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Address'
                placeholder='Enter your address'
                {...(errors.address && {
                  error: true,
                  helperText: utils.string.capitalize(errors.address.message, {
                    capitalizeAll: false
                  })
                })}
              />
            )}
          />

          <Controller
            name='phoneNumber_'
            control={control}
            render={({ field: { ref, ...field } }) => (
              <CustomTextField
                {...{
                  ...field,
                  onChange: e => {
                    let value = e.target.value
                    const value_ = utils.dom.onNumberTypeFieldChangeWithoutE(e.target.value, { maxLength: 15 })
                    setValue('phoneNumber', value_, {
                      shouldValidate: isSubmitted_
                    })
                    e.target.value = value
                    field.onChange(e)
                  }
                }}
                type='phone'
                inputRef={ref}
                fullWidth
                label='Mobile Number'
                placeholder='Enter your mobile number'
                {...(errors.phoneNumber && {
                  error: true,
                  helperText: errors.phoneNumber.message
                })}
              />
            )}
          />

          <CustomTextField
            fullWidth
            variant='filled'
            label='Password'
            sx={{
              paddingInlineEnd: 0
            }}
            placeholder='Enter your password'
            type='password'
            value='000000000'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onMouseDown={e => e.preventDefault()}>
                    <i className={clsx('tabler-eye-off', '!text-[#28282866]')} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 10
            }}
          >
            <Typography
              color='hyperlink.main'
              variant='inherit'
              fontWeight={600}
              onClick={() => onUpdatePasswordClick()}
              sx={{
                cursor: 'pointer'
              }}
            >
              Change Password
            </Typography>
          </Box>

          <AuthFooter>
            <CommonButton loading={updating} label='Update' />
            <Box justifyContent='center' display='flex'>
              <Typography
                color='hyperlink.main'
                variant='inherit'
                fontWeight={600}
                onClick={() => deleteAccountButtonClick()}
                sx={{
                  cursor: 'pointer'
                }}
              >
                Delete Account
              </Typography>
            </Box>
          </AuthFooter>
        </form>
      </Box>
    </>
  )
}

export default Profile
