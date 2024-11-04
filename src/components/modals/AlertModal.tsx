// React Imports

// MUI Imports
import { useModal } from '@/contexts/ModalProvider'
import { utils } from '@/utils/utils'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CommonButton from '../common/CommonButton'
import CommonDialog from '../common/CommonDialog'

const AlertModal = () => {
  const modalContext = useModal()
  const alert = modalContext.modals.alert

  const handleClose = () => modalContext.closeModal('alert')

  const onOkButtonClick = async () => {
    try {
      if (alert) {
        modalContext.openModal({
          type: 'alert',
          props: { ...alert, status: 'loading' }
        })
      }
      await alert?.onOkClick?.()
      modalContext.closeModal('alert')
    } catch (error) {
      utils.toast.error({
        message: utils.error.getMessage(error)
      })
    }
  }

  return (
    <CommonDialog open={true} onClose={handleClose}>
      <DialogTitle id='alert-dialog-title'>{alert?.heading}</DialogTitle>
      <DialogContent>
        <DialogContentText textAlign='center'>{alert?.description}</DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        {alert?.cancelButtonText ? (
          <CommonButton type='button' variant='outlined' onClick={handleClose} label={alert?.cancelButtonText} />
        ) : null}
        <CommonButton
          type='button'
          variant='contained'
          onClick={onOkButtonClick}
          loading={alert?.status === 'loading'}
          label={alert?.okButtonText ?? 'Yes'}
        />
      </DialogActions>
    </CommonDialog>
  )
}

export default AlertModal
