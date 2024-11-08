import CommonImage from '@/components/common/CommonImage'
import Loader from '@/components/Loader'
import { Box } from '@mui/material'
import clsx from 'clsx'
import { ChangeEventHandler, useRef } from 'react'

type IProfilePictureBoxProps = {
  onRemove: () => void
  onChange: ChangeEventHandler<HTMLInputElement>
  src: string | null
  loading: boolean
}

const ProfilePictureBox = (props: IProfilePictureBoxProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const onCameraClick = (remove = false) => {
    if (remove) {
      props.onRemove()
      return
    }
    inputFileRef.current?.click()
  }

  return (
    <>
      <input type='file' accept='image/*' onChange={props.onChange} ref={inputFileRef} className='hidden' />

      <Box position='relative' height='fit-content'>
        <div
          onClick={() => onCameraClick()}
          className={clsx(
            'w-[70px] h-[70px] md:w-[90px] md:h-[90px] flex items-center justify-center rounded-full cursor-pointer',
            props.loading && 'bg-[var(--mui-palette-icon-main)]'
          )}
        >
          {props.loading ? (
            <Loader size='sm' />
          ) : (
            <CommonImage
              src={props.src ?? '/images/icons/user-badge.svg'}
              width={200}
              height={200}
              className='w-full h-full rounded-full object-cover'
            />
          )}
        </div>

        {!props.loading ? (
          <div
            onClick={() => onCameraClick(!!props.src)}
            className='absolute right-0 bottom-0 w-[26px] h-[26px] md:w-[30px] md:h-[30px] bg-white shadow-xl rounded-full p-1.5 cursor-pointer hover:bottom-[2px] icon-transtion'
          >
            {props.src ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={20}
                height={20}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2.8}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='icon icon-tabler icons-tabler-outline icon-tabler-x w-full h-full'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M18 6l-12 12' />
                <path d='M6 6l12 12' />
              </svg>
            ) : (
              <svg
                className='w-full h-full'
                width='12'
                height='10'
                viewBox='0 0 12 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_122_4)'>
                  <path
                    d='M9.47569 2.37227C9.55766 3.07044 9.90681 3.42792 10.4858 3.41903C11.0485 3.41046 11.398 3.03551 11.4496 2.37919C11.5727 2.34295 11.6634 2.36272 11.7408 2.47836C11.9187 2.74392 12.0014 3.02892 12.0003 3.34226C11.9969 4.32081 11.9993 5.29903 11.9993 6.27758C11.9993 7.02154 12.0021 7.76583 11.9986 8.5098C11.9951 9.24816 11.5176 9.81486 10.7729 9.96477C10.6463 9.99014 10.5134 9.99805 10.3833 9.99838C7.46133 10.0004 4.53902 10 1.61707 9.99937C0.782374 9.99937 0.158707 9.52327 0.0209284 8.77997C0.00244165 8.67948 0.00139523 8.57536 0.00139523 8.4729C0 6.76686 -0.000348807 5.06082 0.000348807 3.35478C0.000697614 2.4553 0.656803 1.84148 1.61428 1.84115C1.99797 1.84115 2.382 1.83555 2.76569 1.84412C2.90521 1.84708 2.97916 1.79799 3.03706 1.68267C3.18391 1.38944 3.34157 1.10082 3.49574 0.810874C3.69038 0.445153 4.0036 0.261634 4.43926 0.261963C5.4815 0.262952 6.52408 0.261963 7.56632 0.262293C8.01384 0.262293 8.32951 0.458003 8.51472 0.83921C8.53147 0.873475 8.53426 0.930146 8.51542 0.960787C8.10627 1.60953 8.62529 2.39929 9.39406 2.36535C9.41918 2.36437 9.44464 2.36931 9.47569 2.37194V2.37227ZM3.35064 5.64564C3.34436 7.02253 4.52193 8.14737 5.97855 8.15561C7.44668 8.16384 8.6382 7.05614 8.64866 5.67299C8.65913 4.28654 7.47039 3.1561 6.00087 3.15511C4.54356 3.1538 3.35692 4.26908 3.35064 5.64597V5.64564Z'
                    fill='#002047'
                  />
                  <path
                    d='M10.0505 1.05203C10.0505 0.820081 10.0467 0.599331 10.0519 0.37891C10.0561 0.202309 10.1768 0.0616221 10.3494 0.0158246C10.5301 -0.0319498 10.7237 0.0286743 10.8127 0.183529C10.858 0.262604 10.8789 0.361118 10.8835 0.452383C10.8939 0.647764 10.8866 0.843804 10.8866 1.05203C11.113 1.05203 11.3254 1.05138 11.5375 1.05203C11.813 1.05302 11.9996 1.21579 11.9976 1.45103C11.9955 1.68068 11.8099 1.83982 11.541 1.84114C11.3285 1.84212 11.1158 1.84114 10.8863 1.84114C10.8863 2.05068 10.8852 2.25035 10.8863 2.44968C10.887 2.58279 10.8521 2.70206 10.7415 2.79234C10.6152 2.89514 10.4698 2.9238 10.3156 2.86515C10.1586 2.80552 10.0589 2.6935 10.0523 2.52876C10.0453 2.3482 10.0495 2.16765 10.0488 1.98676C10.0488 1.94261 10.0488 1.89846 10.0488 1.84081C9.80565 1.84081 9.57579 1.84509 9.34628 1.83982C9.03026 1.83224 8.83492 1.53011 8.97619 1.26982C9.05467 1.12518 9.18478 1.05335 9.35674 1.05203C9.58242 1.05039 9.80775 1.0517 10.0498 1.0517L10.0505 1.05203Z'
                    fill='#002047'
                  />
                  <path
                    d='M4.18777 5.6561C4.18777 4.71017 4.9991 3.9438 5.99948 3.94446C7.00055 3.94479 7.81048 4.7105 7.81083 5.65643C7.81153 6.6017 7.0009 7.36675 5.99913 7.36675C4.99701 7.36675 4.18743 6.60236 4.18777 5.65643V5.6561Z'
                    fill='#002047'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_122_4'>
                    <rect width='12' height='10' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            )}
          </div>
        ) : null}
      </Box>
    </>
  )
}

export default ProfilePictureBox
