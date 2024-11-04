import { ButtonProps, styled, SxProps, Theme } from '@mui/material'
import { ButtonHTMLAttributes } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Loader from '../Loader'
import clsx from 'clsx'

type ICommonButtonProps = {
  label: string
  type?: ButtonHTMLAttributes<any>['type']
  sx?: SxProps<Theme>
  loading?: boolean
} & ButtonProps

const CustomButton = styled(LoadingButton)(_ => ({}))

const CommonButton = (props: ICommonButtonProps) => {
  const { loading, ...rest } = props

  return (
    <CustomButton
      fullWidth
      disabled={loading}
      loading={loading}
      onClick={props.onClick}
      variant='contained'
      type={props.type ?? 'submit'}
      {...rest}
      className={clsx(props.className, 'custom-btn-transition')}
      sx={{
        borderRadius: 30,
        padding:
          props.size === 'small'
            ? 2
            : {
                xs: 3,
                md: 4
              },
        ...(props.size !== 'small' && {
          minHeight: `46px`
        }),
        maxWidth: 350,
        margin: 'auto',
        ...(props?.sx ?? {})
      }}
    >
      {/* {props.label} */}
      {props.loading ? <Loader size='sm' bgVariant={props.color === 'error' ? 'error' : 'primary'} /> : props.label}
    </CustomButton>
  )
}

export default CommonButton
