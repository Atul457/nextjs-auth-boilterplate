// Type Imports
import HomeIcon from '@/components/icons/Home'
import ProfileIcon from '@/components/icons/Profile'
import type { VerticalMenuDataType } from '@/types/menuTypes'

const iconClassName = 'max-lg:w-[16px]'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Dashboard',
    href: '/home',
    icon: <HomeIcon className={iconClassName} />
  },
  {
    label: 'Update Profile',
    href: '/profile',
    icon: <ProfileIcon className={iconClassName} />
  }
]

export default verticalMenuData
