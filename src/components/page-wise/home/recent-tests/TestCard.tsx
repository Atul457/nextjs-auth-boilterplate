import CommonChip from '@/components/common/CommonChip'
import themeConfig from '@/configs/themeConfig'
import { IUser } from '@/models/user.model'
import { utils } from '@/utils/utils'
import { Box, Typography } from '@mui/material'

type ITestCardProps = {
  _id: string
  createdAt: Date
  status: 'pending' | 'submitted'
  userFirstName: IUser['firstName']
  userLastName: IUser['lastName']
}

const TestCard = (props: ITestCardProps) => {
  return (
    <Box
      className='shadow-sm'
      sx={{
        position: 'relative',
        padding: 4,
        borderRadius: `${themeConfig.containerRadius / 3}px`
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0
        }}
      >
        <CommonChip
          sx={{
            textTransform: 'capitalize'
          }}
          variant={props.status === 'pending' ? 'error' : 'success'}
          label={utils.string.capitalize(props.status, { capitalizeAll: false })}
        />
      </Box>

      <Typography
        color='primary.main'
        variant='body1'
        sx={{
          fontWeight: 600,
          marginBottom: {
            xs: 1,
            md: 1.5
          },
          fontSize: theme => theme.typography.body1.fontSize
        }}
      >
        {props._id}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          color='customColors.textGray100'
          fontWeight={500}
          variant='body1'
          sx={{
            fontSize: theme => theme.typography.body1.fontSize
          }}
        >
          {utils.helpers.user.getFullName({
            firstName: props.userFirstName,
            lastName: props.userLastName
          })}
        </Typography>
        <Typography
          sx={{
            fontStyle: 'italic',
            fontSize: theme => theme.typography.subtitle2.fontSize
          }}
          variant='subtitle2'
          color='primary.main'
        >
          {utils.date.formatDate(props.createdAt)}
        </Typography>
      </Box>
    </Box>
  )
}

export default TestCard
