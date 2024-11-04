import CustomTextField from '@/@core/components/mui/TextField'
import CommonButton from '@/components/common/CommonButton'
import CommonCheckbox from '@/components/common/CommonCheckbox'
import Terms from '@/components/Terms'
import { useModal } from '@/contexts/ModalProvider'
import { schemas } from '@/schemas/index.schemas'
import AuthFooter from '@/views/auth/AuthFooter'
import { Box, FormHelperText, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import { utils } from '@/utils/utils'

// Third-party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { IUser } from '@/models/user.model'
import { CONST } from '@/constants'

type Step1FormData = (typeof schemas.common.registerStep1)['__outputType']
type Step2FormData = (typeof schemas.common.registerStep2WithAgree)['__outputType']

type IStepTwoProps = {
  data?: Step2FormData | null
  type: Step1FormData['type']
  loading: boolean
  onSubmitButtonClick: (data: Step2FormData) => any
  onStep2Change: (data: Step2FormData) => void
}

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

const USER_TYPES = utils.CONST.USER.TYPES

const USER_DESGNATION_TYPES = [
  { ...CONST.USER.OBJECT_DESIGNATION_TYPES.DIRECTOR },
  { ...CONST.USER.OBJECT_DESIGNATION_TYPES.MANAGER },
  { ...CONST.USER.OBJECT_DESIGNATION_TYPES.SUPERVISOR },
  { ...CONST.USER.OBJECT_DESIGNATION_TYPES.ASSISTANT }
]

const StepTwo = (props: IStepTwoProps) => {
  // States
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset
  } = useForm<Step2FormData>({
    resolver: yupResolver(schemas.common.registerStep2WithAgree),
    defaultValues: {
      agree: false,
      designation: 0,
      type: USER_TYPES.INDIVIDUAL,
      firstName: '',
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
    if (props.data || props.type) {
      reset({
        ...(props.data ?? {}),
        type: props.type,
        ...(typeof props.data?.designation === 'undefined' && {
          designation: 0,
          organizationName: ''
        })
      })
    }
  }, [props.data, props.type])

  useEffect(() => {
    props.onStep2Change(watch())
  }, [watch()])

  // Functions

  const onTermsBoxClick = (openTerms?: boolean) => {
    setValue('agree', !watch('agree'), { shouldTouch: true })

    if (!openTerms) {
      return
    }

    modalContext.openModal({
      type: 'info',
      props: {
        html: <Terms />,
        okButtonText: 'Agree',
        onOkClick: () => {
          setValue('agree', true, { shouldTouch: true })
        },
        heading: 'Terms and Conditions',
        visible: true,
        cancelButtonText: null
      }
    })
  }

  const onSubmit: SubmitHandler<Step2FormData> = async (data: Step2FormData) => {
    try {
      props.onSubmitButtonClick(data)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 max-md:h-full'>
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

          <Controller
            name='designation'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Designation'
                sx={{
                  paddingInlineEnd: 0
                }}
                select
                SelectProps={{
                  MenuProps,
                  multiple: false,
                  onChange: e => field.onChange(e)
                }}
                {...(errors.designation && {
                  error: true,
                  helperText: utils.string.capitalize(errors.designation.message, {
                    capitalizeAll: false
                  })
                })}
              >
                <MenuItem key='select-user-type' value={0} color='customColors.textGray40' disabled>
                  Select Designation
                </MenuItem>

                {USER_DESGNATION_TYPES.map(type => (
                  <MenuItem key={type.LABEL} value={type.VALUE}>
                    {type.LABEL}
                  </MenuItem>
                ))}
              </CustomTextField>
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

      {/* <CustomPhoneNumberField /> */}

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

      <Typography
        fontSize={12}
        component='label'
        htmlFor='agreeToTerms'
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'customColors.textGray84'
        }}
      >
        <CommonCheckbox
          checked={watch('agree') ?? false}
          className='p-0 mr-1.5'
          id='agreeToTerms'
          onClick={() => onTermsBoxClick()}
        />
        <Typography component='label' fontSize='inherit' color='customColors.textGray84' htmlFor='agreeToTerms'>
          I agree with the
        </Typography>
        <Typography
          component='span'
          fontSize='inherit'
          color='primary.main'
          marginLeft={0.9}
          className='custom-link primary'
          onClick={() => onTermsBoxClick(true)}
        >
          Terms and Conditions
        </Typography>
      </Typography>

      {errors.agree ? <FormHelperText error={true}>{errors.agree.message}</FormHelperText> : null}

      <AuthFooter>
        <CommonButton
          loading={props.loading}
          label='Complete'
          sx={{
            marginTop: 4
          }}
        />
      </AuthFooter>
    </form>
  )
}

export default StepTwo
