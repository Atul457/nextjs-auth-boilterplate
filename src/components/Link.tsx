'use client'

// React Imports
import type { ComponentProps, MouseEvent } from 'react'

// Next Imports
import NextLink from 'next/link'
import clsx from 'clsx'

type Props = Omit<ComponentProps<typeof NextLink>, 'href' | 'onClick'> & {
  href?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const Link = (props: Props) => {
  // Props
  const { href, onClick, ...rest } = props

  return (
    <NextLink
      {...rest}
      className={clsx(props.className, 'custom-link hyperlink')}
      href={href || '/'}
      onClick={onClick ? e => onClick(e) : !href ? e => e.preventDefault() : undefined}
    />
  )
}

export default Link
