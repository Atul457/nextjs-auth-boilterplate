import { Dialog, DialogProps, IconButton, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { styled } from '@mui/system'
import React from 'react'

const CommonDialogStyled = styled(Dialog)<DialogProps>(({ theme }) => ({
  '& .MuiDialog-container': {
    '& .MuiDialog-paper': {
      [theme.breakpoints.down('md')]: {
        maxWidth: 'unset',
        width: '100%',
        height: '100%'
      }
    },
    [theme.breakpoints.between('xs', 'md')]: {
      alignItems: 'end'
    }
  },
  '& .MuiPaper-root': {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginInline: 0,
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    [theme.breakpoints.up('md')]: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20
    }
  }
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

type ICommonDialogProps = {
  onClose: () => void
} & DialogProps

const CommonDialog = (props: ICommonDialogProps) => {
  const { maxWidth = 'sm', ...rest } = props

  return (
    <>
      <CommonDialogStyled maxWidth={maxWidth} fullWidth TransitionComponent={Transition} {...rest} />

      <IconButton
        aria-label='close'
        onClick={props.onClose}
        sx={{
          position: 'fixed',
          right: 8,
          padding: '4px !important',
          zIndex: theme => theme.zIndex.modal + 1,
          top: 26,
          display: {
            md: 'none'
          },
          '&:hover': {
            top: 24
          },
          transition: 'var(--custom-icon-transtion)',
          background: 'var(--mui-palette-background-paper) !important',
          color: '#303030'
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={19}
          height={19}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2.8}
          strokeLinecap='round'
          strokeLinejoin='round'
          className='icon icon-tabler icons-tabler-outline icon-tabler-x'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M18 6l-12 12' />
          <path d='M6 6l12 12' />
        </svg>
      </IconButton>
    </>
  )
}

export default CommonDialog
