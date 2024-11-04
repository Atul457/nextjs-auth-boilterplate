import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import { forwardRef } from 'react'

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  width: 'fit-content',
  '&.Mui-checked': {
    color: theme.palette.primary.main
  },
  '&:not(.Mui-checked)': {
    '& svg path': {
      stroke: theme.palette.icon.main,
      strokeWidth: 1.2
    }
  },
  '&.MuiCheckbox-root': {
    padding: '0 !important'
  },
  '& .MuiSvgIcon-root path': {
    d: 'none'
  },
  '&.Mui-checked .MuiSvgIcon-root': {
    borderColor: theme.palette.primary.main
  }
}))

const CommonCheckbox = forwardRef((props: CheckboxProps, ref) => {
  const { size = 'medium', ...rest } = props
  return <CustomCheckbox size={size} inputRef={ref as any} {...rest} />
})

export default CommonCheckbox
