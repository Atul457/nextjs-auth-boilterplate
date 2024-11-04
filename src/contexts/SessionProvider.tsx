'use client'

import { SessionProvider as SessionProvider_ } from 'next-auth/react'
import { PropsWithChildren } from 'react'

const SessionProvider = (props: PropsWithChildren) => {
  return <SessionProvider_>{props.children}</SessionProvider_>
}

export default SessionProvider
