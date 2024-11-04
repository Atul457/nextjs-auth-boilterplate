// React Imports

// MUI Imports
import { useModal } from '@/contexts/ModalProvider'
import { utils } from '@/utils/utils'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CommonButton from '../common/CommonButton'
import CommonDialog from '../common/CommonDialog'

// Third-party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { schemas } from '@/schemas/index.schemas'
import { UserService } from '@/services/client/UserService'
import { useState } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import clsx from 'clsx'
import { IconButton, InputAdornment } from '@mui/material'
import { useRouter } from 'next/navigation'

type FormData = (typeof schemas.common.updatePasswordWithConfirm)['__outputType']

const UpdatePasswordModal = () => {
  // States
  const [loading, setLoading] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isCPasswordShown, setCIsPasswordShown] = useState(false)
  const [isOPasswordShown, setOIsPasswordShown] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemas.common.updatePasswordWithConfirm),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  // Hooks

  const router = useRouter()

  const modalContext = useModal()

  const handleClose = () => modalContext.closeModal('updatePassword')

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleoClickShowPassword = () => setOIsPasswordShown(show => !show)

  const handlecClickShowPassword = () => setCIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (credentials: FormData) => {
    try {
      setLoading(true)
      const us = new UserService()
      const response = await us.updatePassword(credentials)
      utils.toast.success({ message: response.message! })
      handleClose()
    } catch (error: any) {
      setLoading(false)
      utils.toast.error({
        message: utils.error.getMessage(error)
      })
    }
  }

  return (
    <CommonDialog open={true} onClose={handleClose}>
      <DialogTitle id='alert-dialog-title'>Change Password</DialogTitle>
      <DialogContent>
        <form
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 max-md:h-full'
        >
          <Controller
            name='oldPassword'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                variant='filled'
                label='Old Password'
                sx={{
                  paddingInlineEnd: 0
                }}
                placeholder='Enter old password'
                type={isOPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handleoClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={clsx(isOPasswordShown ? 'tabler-eye-off' : 'tabler-eye', '!text-[#28282866]')} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                {...(errors.oldPassword && {
                  error: true,
                  helperText: utils.string.capitalize(errors.oldPassword.message, {
                    capitalizeAll: false
                  })
                })}
              />
            )}
          />

          <Controller
            name='newPassword'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                variant='filled'
                label='New Password'
                sx={{
                  paddingInlineEnd: 0
                }}
                placeholder='Enter new password'
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
                {...(errors.newPassword && {
                  error: true,
                  helperText: utils.string.capitalize(errors.newPassword.message, {
                    capitalizeAll: false
                  })
                })}
              />
            )}
          />

          <Controller
            name='confirmPassword'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                variant='filled'
                label='Confirm Password'
                sx={{
                  paddingInlineEnd: 0
                }}
                placeholder='Enter password again'
                type={isCPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handlecClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={clsx(isCPasswordShown ? 'tabler-eye-off' : 'tabler-eye', '!text-[#28282866]')} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                {...(errors.confirmPassword && {
                  error: true,
                  helperText: utils.string.capitalize(errors.confirmPassword.message, {
                    capitalizeAll: false
                  })
                })}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <CommonButton
          type='button'
          variant='contained'
          onClick={handleSubmit(onSubmit)}
          loading={loading}
          label='Update'
        />
      </DialogActions>
    </CommonDialog>
  )
}

export default UpdatePasswordModal
