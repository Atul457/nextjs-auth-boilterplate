'use client'

// React Imports
import { forwardRef } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'
import { IMaskInput } from 'react-imask'

type ITextFieldStyledProps = TextFieldProps & {
  type?: TextFieldProps['type'] | 'phone'
}

const TextFieldStyled = styled(TextField)<ITextFieldStyledProps>(({ theme, ...rest }) => ({
  '& .MuiInputLabel-root': {
    maxWidth: '100%',
    fontSize: theme.typography.body2.fontSize,
    marginBottom: theme.spacing(1),
    left: theme.spacing(3),
    top: theme.spacing(2),
    color: 'var(--mui-palette-customColors-textGray40)',
    '&:not(.Mui-error).MuiFormLabel-colorPrimary.Mui-focused': {
      color: 'var(--mui-palette-primary-main) !important'
    },
    '&.Mui-disabled': {
      color: 'var(--mui-palette-text-disabled)'
    },
    '&.Mui-error': {
      color: 'var(--mui-palette-customColors-textGray40)'
    }
  },
  '& .MuiInputBase-root': {
    '& .MuiInputBase-input::placeholder': {
      fontWeight: 400,
      color: 'var(--mui-palette-customColors-placeholder)'
    },
    alignItems: 'flex-end',
    color: 'var(--mui-palette-primary-main) !important',
    backgroundColor: `${rest.type === 'search' ? '#ECF4FF' : '#F8F8F8'} !important`,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 500,
    '&.MuiInputBase-sizeSmall': {
      borderRadius: rest.type === 'search' ? 80 : 12,
      overflow: 'hidden'
    },
    '&:before, &:after': {
      display: 'none'
    },
    '&.Mui-error': {
      borderColor: 'var(--mui-palette-error-main)'
    },
    '& .MuiInputBase-input': {
      '&:not(textarea).MuiInputBase-inputSizeSmall': {
        padding: rest.type !== 'search' ? '28px 24px 12px 24px' : '16px 24px'
      }
    },
    '&.Mui-disabled': {
      backgroundColor: 'var(--mui-palette-action-hover) !important'
    }
  },

  '& .MuiFormHelperText-root': {
    margin: theme.spacing(1, 0, 0, 0),
    fontSize: theme.typography.body2.fontSize,
    fontWeight: 500,
    '&.Mui-error': {
      color: 'var(--mui-palette-error-main)'
    },
    '&.Mui-disabled': {
      color: 'var(--mui-palette-customColors-textGray40)'
    }
  },

  // Adornments
  '& .MuiInputAdornment-root': {
    height: 'fit-content',
    maxHeight: 'unset',
    padding: theme.spacing(0, 2, rest.type !== 'search' ? 2 : 0, 0),
    marginBlockStart: '0px !important',
    '&.MuiInputAdornment-positionStart + .MuiInputBase-input:not(textarea)': {
      paddingInlineStart: '0px !important'
    }
  },
  '& .MuiInputBase-inputAdornedEnd.MuiInputBase-input': {
    paddingInlineEnd: '0px !important'
  },

  '& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart.Mui-focused': {
    paddingInlineStart: '13px',
    '& .MuiInputBase-input': {
      paddingInlineStart: '0px !important'
    }
  },
  '& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart': {
    paddingInlineStart: '14px',
    ...(rest.type === 'search' && {
      alignItems: 'center'
    })
  },
  '& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd': {
    paddingInlineEnd: '14px'
  },
  '& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd.Mui-focused:not(.MuiAutocomplete-inputRoot)': {
    paddingInlineEnd: '13px',
    '& .MuiInputBase-input': {
      paddingInlineEnd: '0px !important'
    }
  },
  '& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart.Mui-focused': {
    paddingInlineStart: '15px',
    '& .MuiInputBase-input': {
      paddingInlineStart: '0px !important'
    }
  },
  '& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart': {
    paddingInlineStart: '16px'
  },
  '& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedEnd.Mui-focused': {
    paddingInlineEnd: '15px',
    '& .MuiInputBase-input': {
      paddingInlineEnd: '0px !important'
    }
  },
  '& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedEnd': {
    paddingInlineEnd: '16px'
  },
  '& .MuiInputAdornment-sizeMedium': {
    'i, svg': {
      fontSize: '1.25rem'
    }
  },

  // For Select
  '& .MuiSelect-select.MuiInputBase-inputSizeSmall, & .MuiNativeSelect-select.MuiInputBase-inputSizeSmall': {
    '& ~ i, & ~ svg': {
      inlineSize: '1.125rem',
      blockSize: '1.125rem',
      bottom: theme.spacing(3),
      color: 'var(--mui-palette-customColors-textGray40)'
    },
    ...(!rest.value && {
      color: 'var(--mui-palette-customColors-placeholderLight)',
      fontWeight: 400
    })
  },
  '& .MuiSelect-select': {
    minHeight: 'unset !important',
    lineHeight: '1.4375em',
    '&.MuiInputBase-input': {
      paddingInlineEnd: '32px !important'
    }
  },
  '& .MuiSelect-select:focus, & .MuiNativeSelect-select:focus': {
    backgroundColor: 'transparent'
  }
}))

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const PhoneField = forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask='(#000) 0000 000 000'
      definitions={{
        '#': /[1-9]/
      }}
      inputRef={ref} // Forward the ref here
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

const CustomTextField = forwardRef((props: ITextFieldStyledProps, ref) => {
  const { size = 'small', InputLabelProps, ...rest } = props

  return (
    <TextFieldStyled
      size={size}
      inputRef={ref}
      {...rest}
      placeholder={rest.placeholder ? `${rest.placeholder}...` : rest.placeholder}
      variant='filled'
      InputProps={
        props.type === 'phone'
          ? {
              ...rest.InputProps,
              inputComponent: PhoneField as any
            }
          : rest.InputProps
      }
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true
      }}
    />
  )
})

export default CustomTextField
