'use client'

// React Imports
import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react'

// Next Imports
import AuthWrapper from '@/components/page-wise/auth/wrapper/AuthWrapper'
import { IUser } from '@/models/user.model'
import { schemas } from '@/schemas/index.schemas'
import { useAppDispatch } from '@/store/slices/hooks/useAppDispatch'
import { userThunks } from '@/store/slices/user/user.thunk'
import { utils } from '@/utils/utils'
import { signIn, useSession } from 'next-auth/react'
import StepOne from './register/StepOne'
import ProfilePictureBox from './register/step-two/ProfilePictureBox'
import StepTwo from './register/step-two/StepTwo'
import { UserService } from '@/services/client/UserService'

const stepTitleMapping = {
  1: 'Sign Up to',
  2: 'Set up Profile to'
}

type IProfilePicture = {
  src: string
  file: File
} | null

type Step1FormData = (typeof schemas.common.registerStep1)['__outputType']
type Step2FormData = (typeof schemas.common.registerStep2WithAgree)['__outputType']

const USER_TYPES = utils.CONST.USER.TYPES

const Register = () => {
  // States
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [converting, setConverting] = useState(false)
  const [profilePicture, setProfilePicture] = useState<IProfilePicture>(null)
  const [step1Data, setStep1Data] = useState<Step1FormData | null>(null)
  const [step2Data, setStep2Data] = useState<Step2FormData | null>(null)

  const tempStep2Data = useRef<typeof step2Data>(null)

  // Hooks

  const session = useSession()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (step === 1 && tempStep2Data.current) {
      setStep2Data({ ...tempStep2Data.current })
    }
  }, [step])

  // Functions

  const uploadProfilePicture = useCallback(
    async (token: string) => {
      if (profilePicture?.file) {
        try {
          const us = new UserService()
          await us.uploadUserProfilePicture({
            file: profilePicture!.file,
            accessToken: token
          })
        } catch (error: any) {
          console.error(error)
        }

        window.location.href = '/'
      }
    },
    [profilePicture?.file]
  )

  // Single hook

  useEffect(() => {
    if (session.status === 'authenticated') {
      const token = session.data.user.token!
      const file = profilePicture?.file
      if (!file) {
        window.location.href = '/'
      } else {
        uploadProfilePicture(token)
      }
    }
  }, [session, profilePicture?.file, uploadProfilePicture])

  // Single hook

  const profilePictureChange: ChangeEventHandler<HTMLInputElement> = async e => {
    await utils.helpers.user.profilePictureChange({
      e,
      setProfilePicture,
      setConverting
    })
  }

  const onRemoveProfilePicture = () => {
    setProfilePicture(null)
  }

  const onStep2Change = (data: Step2FormData) => {
    tempStep2Data.current = data
  }

  const onGoBackButtonClick = () => {
    setStep(1)
  }

  const onStep1SubmitButtonClick = (data: Step1FormData) => {
    setStep1Data(data)
    setStep(2)
  }

  const onStep2SubmitButtonClick = (data: Step2FormData) => {
    setStep2Data(data)
    onSubmit({ ...step1Data!, ...data })
  }

  const onSubmit = async (credentials: Step1FormData & Step2FormData) => {
    try {
      setLoading(true)

      if (![USER_TYPES.GOVT_ORGANISATION, USER_TYPES.CORPORATE_EMPLOYER].includes(credentials.type as IUser['type'])) {
        delete credentials.designation
      }

      const data = await signIn('credentials', {
        data: JSON.stringify({ ...credentials }),
        type: 'register',
        redirect: false
      })

      if (data?.error) {
        utils.toast.error({ message: utils.error.getMessage(data?.error) })
        setLoading(false)
      }
    } catch (error: any) {
      utils.toast.error({ message: utils.error.getMessage(error) })
      setLoading(false)
      console.error(error)
    }
  }

  return (
    <AuthWrapper
      onGoBackButtonClick={step === 2 ? onGoBackButtonClick : null}
      title={stepTitleMapping[step as keyof typeof stepTitleMapping]}
      adorment={
        step === 2 ? (
          <ProfilePictureBox
            loading={converting}
            onChange={profilePictureChange}
            onRemove={onRemoveProfilePicture}
            src={profilePicture?.src ?? null}
          />
        ) : null
      }
    >
      {step === 1 ? <StepOne onSubmitButtonClick={onStep1SubmitButtonClick} data={step1Data} /> : null}

      {step === 2 && step1Data ? (
        <StepTwo
          loading={loading}
          data={step2Data}
          onStep2Change={onStep2Change}
          onSubmitButtonClick={onStep2SubmitButtonClick}
          type={step1Data.type}
        />
      ) : null}
    </AuthWrapper>
  )
}

export default Register
