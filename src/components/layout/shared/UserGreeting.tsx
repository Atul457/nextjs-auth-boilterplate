'use client'

import { useAppSelector } from '@/store/slices/hooks/useAppSelector'
import { userSelectors } from '@/store/slices/user/user.slice'
import { utils } from '@/utils/utils'
import { Avatar, Box, Typography } from '@mui/material'

const UserGreeting = () => {
  const user = useAppSelector(userSelectors.user)
  const isSignedIn = useAppSelector(userSelectors.isSignedIn)
  const userStatus = useAppSelector(userSelectors.userStatus)
  const loading = userStatus === 'loading'

  const userName = user ? utils.helpers.user.getFullName(user) : 'User name'
  const profilePicture = user?.profilePicture ?? utils.CONST.USER.DEFAULT_PROFILE_PICTURE

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <Avatar
        alt={userName}
        src={profilePicture}
        sx={{
          marginRight: 2
        }}
      />

      <Box>
        <Typography
          color='primary.main'
          variant='body1'
          sx={{
            fontWeight: 600,
            fontSize: theme => theme.typography.body1.fontSize
          }}
        >
          {userName}
        </Typography>
        <Typography
          sx={{
            fontSize: theme => theme.typography.subtitle2.fontSize
          }}
          variant='subtitle2'
          color='primary.main'
        >
          Good Morning!
        </Typography>
      </Box>
    </Box>
  )
}

export default UserGreeting
