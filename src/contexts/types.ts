import { IReduxStatus } from '@/store/types'
import { ReactNode } from 'react'

export interface IInitialModalState {
  alert: {
    heading: string
    description: string
    okButtonText?: string
    okButtonLoadingText?: string
    cancelButtonText?: string | null
    status: IReduxStatus
    visible: boolean
    onOkClick?: ((args?: any) => Promise<any>) | ((args?: any) => any) | null
    onCancelClick?: ((args?: any) => Promise<any>) | ((args?: any) => any) | null
  } | null
  updatePassword: {
    visible: boolean
  } | null
  resetPassword: {
    visible: boolean
    token: string
  } | null
  forgotPassword: {
    visible: boolean
  } | null
  info: {
    html: ReactNode
    heading: string
    okButtonText?: string
    cancelButtonText?: string | null
    hidecancelbtn?: boolean
    visible: boolean
    onOkClick?: ((args?: any) => any) | null
    onCancelClick?: ((args?: any) => any) | null
  } | null
}

export type ModalType = keyof IInitialModalState
export type ModalPropsMap = {
  [K in keyof IInitialModalState]: Exclude<IInitialModalState[K], null>
}
export type IModalContext = {
  openModal: <T extends ModalType>(args: { type: T; props: ModalPropsMap[T] }) => void
  modals: IInitialModalState
  closeModal: (args: ModalType) => void
}
