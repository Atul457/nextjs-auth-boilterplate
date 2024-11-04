import { Button } from '@mui/material'
import clsx from 'clsx'

type IGoBackProps = {
  show?: boolean
  onGoBackButtonClick?: Function | null
  showInWeb?: boolean
  className?: string
}

const GoBack = (props: IGoBackProps) => {
  return (
    <div
      className={clsx(
        'my-3.5 flex md:mt-0 items-center relative',
        // "md:left--2",
        // !props.onGoBackButtonClick && "hidden",
        props.className
      )}
    >
      <Button
        onClick={e => props.onGoBackButtonClick?.(e)}
        color='primary'
        variant='outlined'
        sx={{
          visibility: props.show ? 'visible' : 'hidden',
          minWidth: 'unset',
          padding: {
            xs: '6px 7px'
          },
          width: 'fit-content',
          borderRadius: {
            xs: '12px !important',
            md: '8px !important'
          },
          borderColor: '#F8F8F8'
        }}
      >
        <i className='tabler-arrow-left' />
      </Button>
    </div>
  )
}

export default GoBack
