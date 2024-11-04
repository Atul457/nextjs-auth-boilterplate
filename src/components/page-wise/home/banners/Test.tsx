'use client'

import CommonImage from '@/components/common/CommonImage'
import themeConfig from '@/configs/themeConfig'
import { Box, Typography } from '@mui/material'

type ITestProps = {
  type: 'test' | 'report'
  title: string
  description: string
  iconSrc: string
}

const Test = (props: ITestProps) => {
  return (
    <Box
      className='space-y-2'
      sx={{
        paddingInline: {
          xs: 3,
          md: 6
        },
        paddingBlock: {
          xs: 2,
          md: 4
        },
        width: '100%',
        flexDirection: 'column',
        backgroundColor: `customColors.${props.type === 'test' ? 'success' : 'orange'}Light`,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: `${themeConfig.containerRadius}px`,
        height: '100%'
      }}
    >
      <CommonImage
        src={`/images/icons/${props.type !== 'report' ? 'new-test.svg' : 'new-reports.svg'}`}
        className='w-[50px] h-[50px] md:w-[55px] md:h-[55px]'
        width={40}
        height={40}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          variant='h6'
          component='div'
          color='customColors.textGray100'
          sx={{
            fontWeight: 600,
            fontSize: theme => {
              return {
                xs: (theme.typography.h6.fontSize as number) - 2,
                md: theme.typography.h6.fontSize
              }
            }
          }}
        >
          {props.title}
        </Typography>
        <Typography
          component='div'
          variant='subtitle2'
          color='customColors.textGray100'
          sx={{
            fontSize: theme => {
              return {
                xs: (theme.typography.h6.fontSize as number) - 4,
                md: theme.typography.h6.fontSize
              }
            }
          }}
        >
          {props.description}
        </Typography>
      </Box>
    </Box>
  )
}

export default Test
