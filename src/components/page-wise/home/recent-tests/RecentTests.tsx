'use client'

import { Box, Typography } from '@mui/material'
import TestCard from './TestCard'

const RecentTests = () => {
  return (
    <Box component='section'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 5,
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant='h3'
          component='h3'
          color='primary.main'
          fontWeight={600}
          sx={{
            fontSize: theme => theme.typography.h3.fontSize
          }}
        >
          Recent Tests:
        </Typography>

        <Typography
          sx={{
            fontSize: theme => theme.typography.subtitle2.fontSize,
            cursor: 'pointer'
          }}
          variant='subtitle2'
          color='customColors.textGray100'
        >
          View All
        </Typography>
      </Box>

      <Box className='space-y-5'>
        <TestCard
          status='submitted'
          createdAt={new Date()}
          userFirstName='Willom'
          userLastName='Simon'
          _id='Rep67t547729'
        />

        <TestCard
          status='submitted'
          createdAt={new Date()}
          userFirstName='Willom'
          userLastName='Simon'
          _id='Rep67t547729'
        />

        <TestCard
          status='pending'
          createdAt={new Date()}
          userFirstName='Willom'
          userLastName='Simon'
          _id='Rep67t547729'
        />
      </Box>
    </Box>
  )
}

export default RecentTests
