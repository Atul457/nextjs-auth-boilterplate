'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { IModalContext, ModalPropsMap, ModalType } from './types'

const modals_: IModalContext['modals'] = {
  alert: null,
  info: null,
  updatePassword: null,
  resetPassword: null,
  forgotPassword: null
}

export const ModalContext = createContext<IModalContext>({
  modals: modals_,
  openModal: (_: any) => {},
  closeModal: (_: any) => {}
})

export const useModal = () => useContext(ModalContext)

const ModalProvider = (props: PropsWithChildren) => {
  const [modals, setModals] = useState(modals_)

  const openModal = <T extends ModalType>(args: { type: T; props: ModalPropsMap[T] }) => {
    let modals_ = { ...modals }
    modals_[args.type] = args.props
    setModals(modals_)
  }

  const closeModal = (args: ModalType) => {
    let modals_ = { ...modals }
    modals_[args] = null
    setModals(modals_)
  }

  return <ModalContext.Provider value={{ modals, openModal, closeModal }}>{props.children}</ModalContext.Provider>
}

export default ModalProvider
