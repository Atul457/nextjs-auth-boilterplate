'use client'

import Image from 'next/image'
import { useState } from 'react'

export interface ICommonImageProps {
  src: string
  alt?: string
  onClick?: Function
  width: number
  height: number
  className?: string
  crossOrigin?: string
  load?: boolean
  fill?: any
  priority?: boolean
  showLoader?: boolean
}

const SkeletonLoader = ({ className }: { className?: string }) => (
  <div
    role='status'
    className={`h-full w-full animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0 rtl:space-x-reverse ${className} overflow-hidden`}
  >
    <div className='flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-700'></div>
  </div>
)

const CommonImage = (props: ICommonImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const showLoader = props.load ? props.load : false

  const handleOnLoad = () => {
    setIsLoaded(true)
  }

  return (
    <>
      {!isLoaded && (showLoader || props.showLoader) && <SkeletonLoader className={props.className} />}

      {!props.showLoader && (
        <Image
          alt={props.alt ?? 'something'}
          onLoad={handleOnLoad}
          src={props.src}
          onClick={props.onClick as any}
          width={props.width}
          height={props.height}
          className={isLoaded || !showLoader ? props.className : 'h-0 w-0'}
          crossOrigin={props.crossOrigin ?? ('anonymous' as any)}
          {...(props.fill ? { fill: true, quality: 100 } : {})}
          {...(props.priority ? { priority: true } : {})}
          onError={e => {
            if ((e?.target as HTMLImageElement)?.src) {
              ;(e.target as HTMLImageElement).src = '/png/default.webp'
            }
          }}
        />
      )}
    </>
  )
}

export default CommonImage
