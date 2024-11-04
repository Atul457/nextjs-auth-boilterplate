'use client'

import themeConfig from '@/configs/themeConfig'
import { Chip, ChipProps, Theme } from '@mui/material'

type ICommonChipProps = Omit<ChipProps, 'variant'> & {
  label: ChipProps['label']
  variant: 'error' | 'success'
}

const CommonChip = (props: ICommonChipProps) => {
  const { variant, size = 'small', ...rest } = props

  const getBg = (theme: Theme) => {
    const { redLight, successLight } = theme.colorSchemes.light.palette.customColors
    return variant === 'error' ? redLight : successLight
  }

  const getColor = (theme: Theme) => {
    const { red, success } = theme.colorSchemes.light.palette.customColors
    return variant === 'error' ? red : success
  }

  return (
    <Chip
      size={size}
      {...rest}
      sx={{
        color: getColor,
        background: getBg,
        fontSize: theme => theme.typography.subtitle2.fontSize,
        borderRadius: `${themeConfig.containerRadius / 3}px`
      }}
    />
  )
}

export default CommonChip
