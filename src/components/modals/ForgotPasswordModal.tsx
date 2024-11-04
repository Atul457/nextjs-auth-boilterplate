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

type FormData = (typeof schemas.common.forgotPasswordSchema)['__outputType']

const ForgotPasswordModal = () => {
  // States
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemas.common.forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const modalContext = useModal()

  const handleClose = () => modalContext.closeModal('forgotPassword')

  const onSubmit: SubmitHandler<FormData> = async (credentials: FormData) => {
    setLoading(true)
    try {
      const us = new UserService()
      const response = await us.forgotPassword(credentials)

      utils.toast.success({ message: response.message! })

      modalContext.closeModal('forgotPassword')
    } catch (error: any) {
      setLoading(false)
      utils.toast.error({
        message: utils.error.getMessage(error)
      })
    }
  }

  return (
    <CommonDialog open={true} onClose={handleClose}>
      <DialogTitle id='alert-dialog-title'>Forgot Password</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <CommonButton
          type='button'
          variant='contained'
          onClick={handleSubmit(onSubmit)}
          loading={loading}
          label='Reset'
        />
      </DialogActions>
    </CommonDialog>
  )
}

export default ForgotPasswordModal
