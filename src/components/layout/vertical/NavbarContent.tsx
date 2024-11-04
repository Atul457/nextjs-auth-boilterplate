'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import Typography from '@mui/material/Typography'

// import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { useAppSelector } from '@/store/slices/hooks/useAppSelector'
import { userSelectors } from '@/store/slices/user/user.slice'
import { utils } from '@/utils/utils'
import CustomTextField from '@/@core/components/mui/TextField'
import { usePathname } from 'next/navigation'

const hrefsHeadingMapping = {
  '/home': 'Dashboard',
  '/profile': 'Update Profile'
}

const NavbarContent = () => {
  const pathname = usePathname()
  const user = useAppSelector(userSelectors.user)
  const userName = user ? utils.helpers.user.getFullName(user) : null

  return (
    <div
      className={classnames(
        verticalLayoutClasses.navbarContent,
        'flex items-center justify-between gap-4 is-full min-h-[34px]'
      )}
    >
      <div className='flex items-center gap-2'>
        {/* <ModeDropdown /> */}
        <NavToggle />
        <Box>
          <Typography
            className='max-lg:hidden'
            variant='h2'
            component='h2'
            color='primary.main'
            fontWeight={600}
            sx={{
              fontSize: {
                lg: 34
              }
            }}
          >
            {hrefsHeadingMapping[pathname as keyof typeof hrefsHeadingMapping] ?? null}
          </Typography>
          <Typography
            className='lg:hidden'
            variant='body2'
            sx={{
              color: {
                xs: 'subTitle.mob'
              },
              fontWeight: 600
            }}
          >
            Hello, {userName}
          </Typography>
          <Typography
            variant='body1'
            className='max-lg:hidden'
            sx={{
              color: {
                lg: 'subTitle.web'
              }
            }}
          >
            Hey {userName}, Welcome to Novatech
          </Typography>
        </Box>
      </div>

      <div className='flex flex-wrap items-center space-x-6'>
        <CustomTextField
          sx={{
            display: {
              xs: 'none',
              lg: 'block'
            }
          }}
          type='search'
          placeholder='Search here'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <IconButton edge='end' onMouseDown={e => e.preventDefault()}>
                  <i className='tabler-search !text-xl !text-[var(--mui-palette-primary-main)]' />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* Dashboard */}
        <div className='flex items-center'>
          <UserDropdown />
        </div>
      </div>
    </div>
  )
}

export default NavbarContent
