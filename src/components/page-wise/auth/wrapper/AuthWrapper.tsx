import { ChildrenType } from '@/@core/types'
import GoBack from '@/components/common/GoBack'
import { Box, styled, Typography } from '@mui/material'
import clsx from 'clsx'
import { ReactNode } from 'react'

// Styled Custom Components
const AuthIllustration = styled('img')(() => ({
  zIndex: 2,
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  blockSize: 'auto',
  height: '100vh',
  top: '-4%'
}))

type IAuthWrapperProps = ChildrenType & {
  title: string
  adorment?: ReactNode
  onGoBackButtonClick?: Function | null
}

const AuthWrapper = (props: IAuthWrapperProps) => {
  return (
    <div className='flex bs-full justify-center items-center bg-custom-gradient relative md:p-10'>
      <AuthIllustration
        src='/images/blank/Alt Front Image Masked.png'
        alt='character-illustration'
        className='max-md:hidden'
      />

      <div
        className={clsx(
          'flex flex-col max-md:justify-center items-start bs-fit bg-backgroundPaper !min-is-full p-3 md:!min-is-[unset] md:px-10 md:pb-10 md:pt-6 md:is-[540px] md:rounded-[20px] bg-no-repeat bg-right-bottom bg-opacity-80 md:min-h-[540px] dvh max-md:h-full pbs-0 auth-bg md:h-fit'
        )}
      >
        <GoBack
          onGoBackButtonClick={props.onGoBackButtonClick ?? null}
          show={typeof props.onGoBackButtonClick === 'function'}
        />

        <div className='flex flex-col gap-6 is-full md:is-full max-md:h-full'>
          <Box
            display='flex'
            justifyContent='space-between'
            flexWrap='wrap'
            sx={{
              minHeight: {
                md: 90,
                xs: 70
              }
            }}
          >
            <Typography
              variant='h3'
              color='primary.main'
              component='p'
              fontWeight={400}
              sx={{
                fontSize: {
                  md: 28,
                  xs: 22
                },
                wordSpacing: 2
              }}
            >
              {props.title}
              <br />
              <Typography variant='inherit' fontWeight={600} color='inherit' component='span'>
                Novatech!
              </Typography>
            </Typography>
            {props?.adorment ?? null}
          </Box>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default AuthWrapper
