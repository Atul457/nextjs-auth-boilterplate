/*
 * We recommend using the merged theme if you want to override our core theme.
 * This means you can use our core theme and override it with your own customizations.
 * Write your overrides in the userTheme object in this file.
 * The userTheme object is merged with the coreTheme object within this file.
 * Export this file and import it in the `@components/theme/index.tsx` file to use the merged theme.
 */

// MUI Imports
import { deepmerge } from '@mui/utils'
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { SystemMode } from '@core/types'

// Core Theme Imports
import coreTheme from '@core/theme'

import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
})

const mergedTheme = (settings: Settings, mode: SystemMode, direction: Theme['direction']) => {
  // Vars
  const userTheme = {
    typography: {
      fontFamily: poppins.style.fontFamily,
      body1: {
        fontSize: {
          xs: 13,
          md: 16
        } as any
      },
      subtitle2: {
        fontSize: {
          xs: 11,
          md: 13
        } as any
      },
      h3: {
        lineHeight: 1.4,
        fontSize: {
          xs: 18,
          md: 24
        } as any
      },
      h6: {
        fontSize: 15
      }
    },
    components: {
      MuiChip: {
        styleOverrides: {
          labelSmall: {
            paddingInline: 20
          }
        }
      },
      MuiFormHelperText: {
        defaultProps: {
          sx: {
            fontSize: 12,
            fontWeight: 500
          }
        }
      },
      MuiDialogActions: {
        defaultProps: {
          sx: {
            padding: {
              xs: '1rem 1rem',
              md: '1.9rem 40px'
            } as any,
            marginTop: {
              xs: '2rem',
              md: '2rem'
            } as any
          }
        }
      },
      MuiDialogTitle: {
        defaultProps: {
          color: 'primary.main',
          fontWeight: 600,
          textAlign: 'center',
          sx: {
            fontSize: {
              md: 28,
              xs: 18
            } as any,
            padding: {
              xs: '1rem 1rem 1.5rem 1rem',
              md: '1.5rem 40px'
            } as any
          }
        }
      },
      MuiDialogContent: {
        defaultProps: {
          sx: {
            padding: {
              xs: '1rem 1rem',
              md: '1.5rem 40px'
            } as any
          }
        }
      }
    },
    colorSchemes: {
      light: {
        palette: {
          icon: {
            main: '#28282866'
          },
          customColors: {
            textGray60: '#28282899',
            textGray40: '#28282866',
            textGray84: '#282828D6',
            textGray100: '#282828',
            successLight: '#F0FFDF',
            success: '#62B007',
            orangeLight: '#FFF2DC',
            placeholder: 'rgb(142, 142, 142)',
            redLight: '#FFF0F0',
            red: '#F80000',
            placeholderLight: 'rgb(142, 142, 142, 0.46)'
          },
          hyperlink: {
            main: '#00BBFF'
          },
          ...({
            subTitle: {
              web: '#464255',
              mob: '#282828'
            }
          } as any)
        }
      }
    }
    // Write your overrides here.
  } as Theme

  return deepmerge(coreTheme(settings, mode, direction), userTheme)
}

export default mergedTheme
