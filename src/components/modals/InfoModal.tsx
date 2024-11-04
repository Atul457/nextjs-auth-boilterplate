// React Imports

// MUI Imports
import { useModal } from '@/contexts/ModalProvider'
import { utils } from '@/utils/utils'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CommonButton from '../common/CommonButton'
import CommonDialog from '../common/CommonDialog'

const InfoModal = () => {
  const modalContext = useModal()
  const info = modalContext.modals.info
  const handleClose = () => modalContext.closeModal('info')

  const onOkButtonClick = async () => {
    try {
      await info?.onOkClick?.()
      modalContext.closeModal('info')
    } catch (error) {
      utils.toast.error({
        message: utils.error.getMessage(error)
      })
    }
  }

  return (
    <CommonDialog open={true} fullWidth onClose={handleClose}>
      <DialogTitle>{info?.heading}</DialogTitle>
      <DialogContent>{info?.html}</DialogContent>
      <DialogActions className='dialog-actions-dense'>
        {info?.cancelButtonText !== null ? (
          <CommonButton label={info?.cancelButtonText ?? 'Close'} onClick={handleClose} />
        ) : null}
        {!info?.hidecancelbtn && (
          <CommonButton label={info?.okButtonText ?? 'Ok'} onClick={onOkButtonClick}></CommonButton>
        )}
      </DialogActions>
    </CommonDialog>
  )
}

export default InfoModal
