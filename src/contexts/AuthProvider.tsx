'use client'

import useLocalStorage from '@/@core/hooks/useLocalStorage'
import Loader from '@/components/Loader'
import { useAppDispatch } from '@/store/slices/hooks/useAppDispatch'
import { userThunks } from '@/store/slices/user/user.thunk'
import { utils } from '@/utils/utils'
import { SessionContextValue, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

const types = utils.CONST.USER.NUMERIC_TYPES

type IUserTypeNumeric = keyof typeof types

type IAuthProviderContext = {
  loading: boolean
  userType: IUserType | null
}

type IUserType = 'admin' | 'user'

type IAuthProviderProps = PropsWithChildren & {}

const AuthProviderContext = createContext<IAuthProviderContext>({
  loading: true,
  userType: null
})

const useAuthProviderContext = () => useContext(AuthProviderContext)

const AuthProvider = (props: IAuthProviderProps) => {
  const session = useSession()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const localStorage = useLocalStorage()

  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState<IUserType | null>(null)

  useEffect(() => {
    localStorage.getKey({ key: 'SIGN_UP' })
    if (localStorage.loading || session.status === 'loading') {
      return
    }
    onSessionStateChange(session)
  }, [localStorage.loading, localStorage.value, pathname, session.status])

  useEffect(() => {
    const authenticated = session.status === 'authenticated'
    if (authenticated) {
      dispatch(userThunks.get())
    }
  }, [session.status])

  const updateUserType = (userType: IUserTypeNumeric) => {
    const { ADMIN } = utils.CONST.USER.TYPES
    const type_ = userType === ADMIN ? 'admin' : 'user'
    setUserType(type_)
  }

  const onSessionStateChange = (session: SessionContextValue) => {
    const user = session.data?.user
    const authenticated = session.status === 'authenticated'
    if (authenticated) {
      if (user?.token) {
        localStorage.setKey({
          key: 'ACCESS_TOKEN',
          value: (user as any).token
        })

        if (user.type) {
          updateUserType(user.type)
        }
      }
    } else {
      localStorage.removeKey({
        key: 'ACCESS_TOKEN'
      })
    }
    setLoading(false)
  }

  const getChildren = (loading: boolean) => {
    if (loading) {
      return <main className='hidden'>{props.children}</main>
    } else {
      return props.children
    }
  }

  return (
    <>
      <AuthProviderContext.Provider value={{ loading, userType }}>
        {loading ? <Loader isPageLoader={true} /> : null}
        {getChildren(loading)}
      </AuthProviderContext.Provider>
    </>
  )
}

export default AuthProvider

export { useAuthProviderContext }
