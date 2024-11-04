import { toast as toastLib, Id, ToastOptions, Slide } from 'react-toastify'
import { string } from './string'

interface IToastArgs {
  message: string
  autoClose?: number
}

interface IToastArgsWithErrorAndToastId extends IToastArgs {
  loadingToastId: Id
  isError: boolean
}

const toastConfig = {
  position: 'top-right' as ToastOptions['position'],
  hideProgressBar: true as ToastOptions['hideProgressBar'],
  theme: 'light' as ToastOptions['theme'],
  transition: Slide
}

const toast = {
  loading: ({ message, autoClose = 300 }: IToastArgs) =>
    toastLib.loading(string.capitalize(message, { capitalizeAll: false }), {
      autoClose,
      ...toastConfig
    }),
  info: ({ message, autoClose = 3000 }: IToastArgs) =>
    toastLib.info(string.capitalize(message, { capitalizeAll: false }), {
      autoClose,
      ...toastConfig
    }),
  error: ({ message, autoClose = 3000 }: IToastArgs) =>
    toastLib.error(string.capitalize(message, { capitalizeAll: false }), {
      autoClose,
      ...toastConfig
    }),
  success: ({ message, autoClose = 3000 }: IToastArgs) =>
    toastLib.success(string.capitalize(message, { capitalizeAll: false }), {
      autoClose,
      ...toastConfig
    }),
  updateLoading: ({ loadingToastId, message, isError }: IToastArgsWithErrorAndToastId) => {
    toastLib.update(loadingToastId, {
      type: isError ? 'error' : 'success',
      render: string.capitalize(message, { capitalizeAll: false }),
      ...toastConfig
    })
  },
  stopLoading: ({ loadingToastId, isError, message, autoClose = 3000 }: IToastArgsWithErrorAndToastId) =>
    toastLib.update(loadingToastId, {
      autoClose,
      type: isError ? 'error' : 'success',
      isLoading: false,
      render: string.capitalize(message, { capitalizeAll: false }),
      ...toastConfig
    })
}

export { toast }
