// React Imports
import type { ReactElement, ReactNode } from 'react'

// MUI Imports
import type { ChipProps } from '@mui/material/Chip'

// Type Imports
import type {
  SubMenuProps as VerticalSubMenuProps,
  MenuItemProps as VerticalMenuItemProps,
  MenuSectionProps as VerticalMenuSectionProps
} from '@menu/vertical-menu'
import type {
  SubMenuProps as HorizontalSubMenuProps,
  MenuItemProps as HorizontalMenuItemProps
} from '@menu/horizontal-menu'

type ICustomVerticalMenuItemDataType = {
  icon: ReactElement | string
  href: string
}

// Vertical Menu Data
export type VerticalMenuItemDataType = Omit<VerticalMenuItemProps, 'children' | 'icon' | 'prefix' | 'suffix'> & {
  label: ReactNode
  prefix?: ReactNode | ChipProps
  suffix?: ReactNode | ChipProps
} & ICustomVerticalMenuItemDataType

export type VerticalSubMenuDataType = Omit<VerticalSubMenuProps, 'children' | 'icon' | 'prefix' | 'suffix'> & {
  children: VerticalMenuDataType[]
  prefix?: ReactNode | ChipProps
  suffix?: ReactNode | ChipProps
} & ICustomVerticalMenuItemDataType

export type VerticalSectionDataType = Omit<VerticalMenuSectionProps, 'children'> & {
  isSection: boolean
  children: VerticalMenuDataType[]
}

export type VerticalMenuDataType = VerticalMenuItemDataType | VerticalSubMenuDataType

// export type VerticalMenuDataType = VerticalMenuItemDataType | VerticalSubMenuDataType | VerticalSectionDataType

// Horizontal Menu Data
export type HorizontalMenuItemDataType = Omit<HorizontalMenuItemProps, 'children' | 'icon' | 'prefix' | 'suffix'> & {
  label: ReactNode
  prefix?: ReactNode | ChipProps
  suffix?: ReactNode | ChipProps
} & ICustomVerticalMenuItemDataType

export type HorizontalSubMenuDataType = Omit<HorizontalSubMenuProps, 'children' | 'icon' | 'prefix' | 'suffix'> & {
  children: HorizontalMenuDataType[]
  prefix?: ReactNode | ChipProps
  suffix?: ReactNode | ChipProps
} & ICustomVerticalMenuItemDataType

export type HorizontalMenuDataType = HorizontalMenuItemDataType | HorizontalSubMenuDataType
