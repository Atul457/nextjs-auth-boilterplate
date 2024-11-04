import { Box, Typography, TypographyProps } from '@mui/material'

const Terms = () => {
  const props: TypographyProps = {
    variant: 'body1',
    component: 'div',
    color: 'primary.main',
    fontWeight: 600,
    sx: {
      marginBottom: {
        xs: 3,
        md: 6
      },
      fontSize: {
        xs: 14,
        md: 16
      }
    }
  }
  const paragraphProps: TypographyProps = {
    variant: 'body2',
    component: 'div',
    color: 'customColors.textGray100',
    fontWeight: 300,
    sx: {
      fontSize: {
        xs: 11,
        md: 12
      }
    }
  }

  return (
    <Box>
      <Typography {...props}>
        Lorem ipsum aborum:
        <Typography {...paragraphProps}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
      </Typography>

      <Typography {...props}>
        Lorem ipsum aborum:
        <Typography {...paragraphProps}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
      </Typography>

      <Typography {...props}>
        Lorem ipsum aborum:
        <Typography {...paragraphProps}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
      </Typography>

      <Typography
        {...props}
        sx={{
          ...(paragraphProps.sx ?? {}),
          marginBottom: {
            xs: 0
          }
        }}
      >
        Lorem ipsum aborum:
        <Typography {...paragraphProps}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
      </Typography>
    </Box>
  )
}

export default Terms
