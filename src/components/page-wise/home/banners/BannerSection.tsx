import { Box } from '@mui/material'
import Novatech from './Novatech'
import Test from './Test'
import themeConfig from '@/configs/themeConfig'

const BannerSection = () => {
  return (
    <Box
      className='lg:space-x-5 max-lg:space-y-5 max-lg:flex-col'
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: themeConfig.containerSpacing / 4
      }}
    >
      <div className='max-lg:w-full lg:w-[60%]'>
        <Novatech />
      </div>
      <div className='flex lg:flex-col max-lg:space-x-5 lg:space-y-5 max-lg:w-full lg:w-[calc(40%-20px)] max-lg:flex-row'>
        <div className='lg:h-[calc(50%-10px)] max-lg:w-[calc(50%-10px)]'>
          <Test
            iconSrc='/images/icons/test.svg'
            type='test'
            title='New Test'
            description='Lorem Ipsum is simply text of the printing'
          />
        </div>
        <div className='lg:h-[calc(50%-10px)] max-lg:w-[calc(50%-10px)]'>
          <Test
            iconSrc='/images/icons/test.svg'
            type='report'
            title='View Reports'
            description='Lorem Ipsum is simply text of the printing'
          />
        </div>
      </div>
    </Box>
  )
}

export default BannerSection
