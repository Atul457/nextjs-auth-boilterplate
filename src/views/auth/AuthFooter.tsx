import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type IAuthFooter = PropsWithChildren & {
  className?: string
}

const AuthFooter = (props: IAuthFooter) => {
  return (
    <div
      className={clsx('flex gap-4 flex-col webkit-bottom min-h-[100px] justify-start pt-4 xl:pt-10', props.className)}
    >
      {props.children}
    </div>
  )
}

export default AuthFooter
