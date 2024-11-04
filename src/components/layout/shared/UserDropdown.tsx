'use client'

// React Imports
import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import { useAppSelector } from '@/store/slices/hooks/useAppSelector'
import { userActions, userSelectors } from '@/store/slices/user/user.slice'
import { utils } from '@/utils/utils'
import Loader from '@/components/Loader'
import { UserService } from '@/services/client/UserService'
import { signOut } from 'next-auth/react'
import { useAppDispatch } from '@/store/slices/hooks/useAppDispatch'
import CommonButton from '@/components/common/CommonButton'
import { IconButton } from '@mui/material'
import { useModal } from '@/contexts/ModalProvider'

// const baseUrl = utils.CONST.APP_CONST.CONFIG.STORAGE_PATH

const UserDropdown = () => {
  // States
  const modalContext = useModal()
  const { settings } = useSettings()
  const [open, setOpen] = useState(false)

  const user = useAppSelector(userSelectors.user)
  const isSignedIn = useAppSelector(userSelectors.isSignedIn)
  const userStatus = useAppSelector(userSelectors.userStatus)
  const loading = userStatus === 'loading'

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  // Hooks
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleUserLogout = async (bypass = false) => {
    if (!bypass) {
      return modalContext.openModal({
        type: 'alert',
        props: {
          heading: 'Alert',
          description: 'Are you sure you want to logout?',
          onOkClick: async () => {
            await handleUserLogout(true)
          },
          visible: true,
          status: 'idle',
          okButtonText: 'Yes'
        }
      })
    }

    try {
      if (isSignedIn) {
        const us = new UserService()
        await us.logout()
        await signOut({
          redirect: false
        })

        dispatch(userActions.resetUser())
      }
      router.push('/login')
    } catch (error) {
      utils.toast.error({
        message: utils.error.getMessage(error)
      })
    }
  }

  if (loading) {
    return <Loader size='sm' />
  }

  const userName = user ? utils.helpers.user.getFullName(user) : 'User name'
  const profilePicture = user?.profilePicture ?? utils.CONST.USER.DEFAULT_PROFILE_PICTURE

  return (
    <>
      <IconButton
        onClick={() => handleUserLogout()}
        size='small'
        disabled={loading}
        sx={{
          background: 'none !important',
          minWidth: 'unset',
          height: 'fit-content',
          paddingRight: '0 !important',
          display: {
            xs: 'flex',
            lg: 'none'
          },
          alignItems: 'center',
          width: 'fit-content',
          border: 'none !important'
        }}
      >
        <i className='tabler-power text-[var(--mui-palette-subTitle-mob)] text-xl' />
      </IconButton>

      <Avatar
        ref={anchorRef}
        alt={userName}
        src={profilePicture}
        onClick={handleDropdownOpen}
        className='cursor-pointer max-lg:hidden lg:bs-[44px] lg:is-[44px]'
      />

      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-6 gap-2' tabIndex={-1}>
                    <Avatar alt={userName} src={profilePicture} />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {userName}
                      </Typography>
                      <Typography variant='caption'>{(user?.email ?? '').toLowerCase()}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <div className='flex items-center plb-2 pli-3'>
                    <CommonButton
                      fullWidth
                      type='button'
                      label='Logout'
                      color='error'
                      size='small'
                      loading={loading}
                      endIcon={<i className='tabler-logout' />}
                      onClick={() => handleUserLogout()}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    />
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
