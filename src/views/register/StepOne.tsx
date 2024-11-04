import CustomTextField from '@/@core/components/mui/TextField'
import CommonButton from '@/components/common/CommonButton'
import Link from '@/components/Link'
import { CONST } from '@/constants'
import { IconButton, InputAdornment, MenuItem, Typography } from '@mui/material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import AuthFooter from '../auth/AuthFooter'

// Third-party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { schemas } from '@/schemas/index.schemas'
import { utils } from '@/utils/utils'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      // width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const USER_TYPES = [
  { ...CONST.USER.OBJECT_TYPES.INDIVIDUAL, DISABLED: false },
  { ...CONST.USER.OBJECT_TYPES.CORPORATE_EMPLOYER, DISABLED: false },
  { ...CONST.USER.OBJECT_TYPES.THIRD_PARTY_ADMINISTRATOR, DISABLED: true },
  { ...CONST.USER.OBJECT_TYPES.GOVT_ORGANISATION, DISABLED: true }
]

type FormData = (typeof schemas.common.registerStep1)['__outputType']

type IStepOneProps = {
  data?: FormData | null
  onSubmitButtonClick: (data: FormData) => any
}

const StepOne = (props: IStepOneProps) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schemas.common.registerStep1),
    defaultValues: {
      email: '',
      password: '',
      type: 0
    }
  })

  // Hooks

  useEffect(() => {
    if (props.data) {
      reset(props.data)
    }
  }, [props.data])

  // Functions

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      props.onSubmitButtonClick(data)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 max-md:h-full'>
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

      <Controller
        name='type'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='User Type'
            sx={{
              paddingInlineEnd: 0
            }}
            select
            SelectProps={{
              MenuProps,
              multiple: false,
              onChange: e => field.onChange(e)
            }}
            {...(errors.type && {
              error: true,
              helperText: utils.string.capitalize(errors.type.message, {
                capitalizeAll: false
              })
            })}
          >
            <MenuItem key='select-user-type' value={0} color='customColors.textGray40' disabled>
              Select User Type
            </MenuItem>

            {USER_TYPES.map(type => (
              <MenuItem key={type.LABEL} value={type.VALUE} disabled={type.DISABLED}>
                {type.LABEL}
              </MenuItem>
            ))}
          </CustomTextField>
        )}
      />

      <AuthFooter>
        <CommonButton label='Sign Up' />
        <Typography
          variant='body1'
          component='div'
          className='flex justify-center items-center flex-wrap'
          fontWeight={400}
          color='customColors.textGray60'
        >
          Already have an account? Please&nbsp;
          <Typography component={Link} href='/login' color='hyperlink.main' variant='inherit' fontWeight={600}>
            Sign In
          </Typography>
        </Typography>
      </AuthFooter>
    </form>
  )
}

export default StepOne
