import CommonImage from '@/components/common/CommonImage'
import themeConfig from '@/configs/themeConfig'
import { Box } from '@mui/material'

const Novatech = () => {
  return (
    <Box
      sx={{
        padding: 10,
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        borderRadius: `${themeConfig.containerRadius}px`,
        justifyContent: 'center',
        minHeight: {
          md: '300px',
          sm: '200px',
          xs: '160px'
        }
      }}
    >
      <CommonImage
        priority={true}
        className='absolute w-auto h-full right-0'
        src='/images/blank/dna-gradient-semi-full.svg'
        width={100}
        height={100}
      />
      <svg
        className='max-w-[330px] w-[70%] h-auto'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        width='235'
        height='52'
        fill='none'
        viewBox='0 0 265 82'
      >
        <g clipPath='url(#clip0_99_583)' filter='url(#filter0_d_99_583)'>
          <path
            fill='#fff'
            d='M13 55.678V14.613h5.778l13.135 20.776c3.04 4.813 5.412 9.14 7.36 13.344l.12-.061c-.486-5.483-.607-10.481-.607-16.878V14.613h4.986v41.065H38.42L25.404 34.84c-2.859-4.57-5.596-9.261-7.663-13.71l-.182.062c.306 5.18.426 10.114.426 16.937v17.549H13zM88.254 26.306l5.778 16.572c.974 2.681 1.764 5.118 2.371 7.556h.182c.67-2.438 1.52-4.875 2.494-7.556l5.717-16.572h5.596l-11.556 29.49h-5.11l-11.189-29.49h5.717zM153.387 18.416v8.47h7.662v4.083h-7.662v15.902c0 3.655 1.033 5.727 4.014 5.727 1.4 0 2.433-.182 3.102-.364l.244 4.021c-1.033.426-2.677.732-4.743.732-2.494 0-4.501-.79-5.778-2.255-1.52-1.584-2.069-4.204-2.069-7.676V30.972h-4.56v-4.084h4.56v-7.067l5.23-1.402v-.003z'
          ></path>
          <path
            fill='#fff'
            d='M164.528 42.257c.12 7.25 4.745 10.236 10.095 10.236 3.832 0 6.142-.67 8.149-1.523l.913 3.84c-1.884.852-5.109 1.828-9.793 1.828-9.062 0-14.473-5.97-14.473-14.867 0-8.896 5.229-15.902 13.804-15.902 9.611 0 12.164 8.47 12.164 13.891 0 1.097-.121 1.95-.182 2.5h-20.677v-.003zm15.691-3.84c.061-3.413-1.4-8.714-7.419-8.714-5.414 0-7.785 4.996-8.211 8.714h15.63zM215.262 55.046c-1.4.732-4.502 1.705-8.455 1.705-8.879 0-14.658-6.033-14.658-15.05 0-9.016 6.204-15.657 15.812-15.657 3.163 0 5.96.79 7.419 1.522l-1.218 4.143c-1.277-.732-3.284-1.402-6.204-1.402-6.749 0-10.4 4.995-10.4 11.15 0 6.824 4.379 11.028 10.218 11.028 3.041 0 5.048-.79 6.568-1.461l.913 4.022h.005zM222.534 13h5.353v18.4h.12c.852-1.522 2.19-2.863 3.833-3.777 1.582-.914 3.466-1.523 5.473-1.523 3.953 0 10.277 2.437 10.277 12.612v17.549h-5.353V39.324c0-4.752-1.763-8.773-6.811-8.773-3.466 0-6.203 2.437-7.175 5.362-.305.732-.364 1.523-.364 2.558v17.792h-5.353V13z'
          ></path>
          <path
            fill='url(#paint0_linear_99_583)'
            d='M66.912 23.568c-2.848 0-5.5 1.166-7.744 2.738 1.882-1.068 4.017-1.626 6.276-1.626 7.618 0 12.694 6.552 12.694 15.009s-5.073 15.008-12.695 15.008c-2.26 0-4.396-.3-6.277-1.371 2.243 1.571 4.898 2.483 7.746 2.483 8.021 0 14.525-7.216 14.525-16.118 0-8.901-6.504-16.118-14.525-16.118v-.005z'
          ></path>
          <path
            fill='url(#paint1_linear_99_583)'
            d='M62.509 27.957c1.246-.501 2.591-.773 3.994-.773 4.183 0 7.857 1.91 9.944 5.56-2.195-4.279-6.34-7.165-11.093-7.165-2.735 0-5.27.957-7.347 2.586l4.504-.208h-.002z'
          ></path>
          <path
            fill='url(#paint2_linear_99_583)'
            d='M66.502 52.29c-2.96 0-5.665-1.215-7.733-3.218-.529-.511-.5-.56-.939-1.164 0 0-.62 1.937.067 3.365 2.143 1.808 4.558 2.627 7.457 2.627 4.755 0 8.898-2.887 11.092-7.165-2.089 3.65-5.76 5.557-9.944 5.557v-.002z'
          ></path>
          <path
            fill='url(#paint3_linear_99_583)'
            d='M59.012 30.021s1.028 4.916-3.032 8.689c-2.295 2.085-5.037 4.448-1.133 9.73-3.338-3.05-5.194-6.91.136-11.82 2.514-2.875 3.289-3.216 4.027-6.598h.002z'
          ></path>
          <path
            fill='url(#paint4_linear_99_583)'
            d='M56.374 38.454s3.271 2.724 1.51 7.902c-1.005 3.156-1.738 4.88 2.102 6.931-1.84-.513-5.64-1.363-4.053-6.67.785-2.665 1.812-4.147.438-8.16l.003-.003z'
          ></path>
          <path
            fill='url(#paint5_linear_99_583)'
            d='M54.798 29.554c1.702-1.132 2.653-.821 3.976-1.022 1.028-.136 1.253-.18 3.281-.277-1.161.668-1.495.973-3.115 1.477-3.222 1.132-7.024 1.633-5.221 7.26-1.498-1.775-1.967-5.414 1.076-7.438h.003z'
          ></path>
          <path
            fill='url(#paint6_linear_99_583)'
            d='M56.72 30.919l1.33.73c.044-.109.083-.211.119-.314l-.99-.542c-.12.028-.28.07-.459.126z'
          ></path>
          <path
            fill='url(#paint7_linear_99_583)'
            d='M57.14 33.366c.06-.092.119-.187.175-.282l-2.3-1.259a4.49 4.49 0 00-.258.237l2.381 1.302.003.002z'
          ></path>
          <path
            fill='url(#paint8_linear_99_583)'
            d='M56.102 34.825l.206-.267-2.338-1.28a3.114 3.114 0 00-.103.322l2.238 1.225h-.002z'
          ></path>
          <path
            fill='url(#paint9_linear_99_583)'
            d='M55.157 35.965l-1.272-.703v.388l1.044.57c.061-.07.14-.154.228-.255z'
          ></path>
          <path
            fill='#43B749'
            d='M54.606 40.333c-.054.1-.11.21-.172.33l2.31.761c0-.128 0-.26-.006-.39l-2.132-.701zM56.58 43.37c.022-.117.043-.24.06-.367l-2.855-.94a4.025 4.025 0 00-.107.355l2.901.955v-.002zM56.067 45.025c.038-.116.08-.232.12-.35l-2.617-.86c.01.134.026.267.043.403l2.454.806zM55.541 46.686c.029-.11.064-.228.1-.357l-1.545-.508-.006.074c.054.129.108.252.164.367l1.29.424h-.003z'
          ></path>
          <path
            fill='#fff'
            d='M141.162 40.921c0 10.907-7.542 15.658-14.659 15.658-7.967 0-14.109-5.85-14.109-15.17 0-9.87 6.447-15.658 14.597-15.658 8.149 0 14.171 6.153 14.171 15.17zm-23.354.306c0 6.459 3.709 11.333 8.942 11.333 5.232 0 8.941-4.813 8.941-11.454 0-4.995-2.494-11.333-8.818-11.333-6.325 0-9.062 5.85-9.062 11.454h-.003zM248 55.657h-5.353v7.312H248v-7.312z'
          ></path>
          <path fill='url(#pattern0_99_583)' d='M96.593 60.922H245.66500000000002V63.018H96.593z'></path>
          <path
            fill='url(#paint10_radial_99_583)'
            d='M96.634 65a3.246 3.246 0 003.242-3.249 3.246 3.246 0 00-3.242-3.249 3.246 3.246 0 00-3.243 3.25A3.246 3.246 0 0096.634 65z'
          ></path>
        </g>
        <defs>
          <filter
            id='filter0_d_99_583'
            width='265'
            height='82'
            x='0'
            y='0'
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            ></feColorMatrix>
            <feOffset dx='2' dy='2'></feOffset>
            <feGaussianBlur stdDeviation='7.5'></feGaussianBlur>
            <feComposite in2='hardAlpha' operator='out'></feComposite>
            <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'></feColorMatrix>
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_99_583'></feBlend>
            <feBlend in='SourceGraphic' in2='effect1_dropShadow_99_583' result='shape'></feBlend>
          </filter>
          <pattern id='pattern0_99_583' width='1' height='1' patternContentUnits='objectBoundingBox'>
            <use transform='scale(.00041 .02941)' xlinkHref='#image0_99_583'></use>
          </pattern>
          <linearGradient
            id='paint0_linear_99_583'
            x1='59.166'
            x2='81.437'
            y1='39.686'
            y2='39.686'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#39B54A'></stop>
            <stop offset='1' stopColor='#8DC63F'></stop>
          </linearGradient>
          <linearGradient
            id='paint1_linear_99_583'
            x1='58.005'
            x2='76.447'
            y1='29.161'
            y2='29.161'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#0BF'></stop>
            <stop offset='1' stopColor='#002047'></stop>
          </linearGradient>
          <linearGradient
            id='paint2_linear_99_583'
            x1='57.571'
            x2='13.256'
            y1='50.315'
            y2='50.315'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#0BF'></stop>
            <stop offset='1' stopColor='#002047'></stop>
          </linearGradient>
          <linearGradient
            id='paint3_linear_99_583'
            x1='51.635'
            x2='59.128'
            y1='39.231'
            y2='39.231'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#39B54A'></stop>
            <stop offset='1' stopColor='#8DC63F'></stop>
          </linearGradient>
          <linearGradient
            id='paint4_linear_99_583'
            x1='55.556'
            x2='59.986'
            y1='45.87'
            y2='45.87'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#0BF'></stop>
            <stop offset='1' stopColor='#002047'></stop>
          </linearGradient>
          <linearGradient
            id='paint5_linear_99_583'
            x1='52.547'
            x2='62.057'
            y1='32.623'
            y2='32.623'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#0BF'></stop>
            <stop offset='1' stopColor='#002047'></stop>
          </linearGradient>
          <linearGradient
            id='paint6_linear_99_583'
            x1='56.721'
            x2='58.169'
            y1='31.219'
            y2='31.219'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#1C75BC'></stop>
            <stop offset='1' stopColor='#002047'></stop>
          </linearGradient>
          <linearGradient
            id='paint7_linear_99_583'
            x1='54.759'
            x2='57.315'
            y1='32.596'
            y2='32.596'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#1C75BC'></stop>
            <stop offset='1' stopColor='#002047'></stop>
          </linearGradient>
          <linearGradient
            id='paint8_linear_99_583'
            x1='53.865'
            x2='56.308'
            y1='34.052'
            y2='34.052'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#1C75BC'></stop>
            <stop offset='1' stopColor='#002047'></stop>
          </linearGradient>
          <linearGradient
            id='paint9_linear_99_583'
            x1='53.885'
            x2='55.157'
            y1='35.739'
            y2='35.739'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#1C75BC'></stop>
            <stop offset='1' stopColor='#002047'></stop>
          </linearGradient>
          <radialGradient
            id='paint10_radial_99_583'
            cx='0'
            cy='0'
            r='1'
            gradientTransform='matrix(3.24281 0 0 3.24872 96.634 61.751)'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#0BF'></stop>
            <stop offset='0.22' stopColor='#00B0FF'></stop>
            <stop offset='0.59' stopColor='#0095FF'></stop>
            <stop offset='1' stopColor='#0070FF'></stop>
          </radialGradient>
          <clipPath id='clip0_99_583'>
            <path fill='#fff' d='M0 0H235V52H0z' transform='translate(13 13)'></path>
          </clipPath>
          <image
            id='image0_99_583'
            width='2424'
            height='34'
            xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACXgAAAAiCAYAAADvPCPGAAAACXBIWXMAAC4jAAAuIwF4pT92AAADoklEQVR4nO3awWETMRAFUIVG3Io7hWrgGHpwBdDA5khILrPwI42y7x0TZTSWJ1rJnqcxxvj++Hr8eHwbbx3Hux+9VxkzxjgqA6uxNs6rlHtxYDVU6SVuntdRWvxirNigi+SVC1Wrr3KtRoaUJ43m1XT/6rqvJvNa8T523VeTeUXfxyvsq7FBtbwusa8WQ6XyyuaeK5zd8/KsOhmr6TOh67PK3eRkrNggd5MTQ8qTupu8HrZvXu4m5wa6m7watnFel9hXi6GSedlXT8a6wN2qa161mqgFy+5fqUHz8yo9E4pzZs8AF8gr+qwt1ld0X01NmD5/VULZV0/FKuY1+33suq8m88re+S6wr9YiRfO6xL4am9A5+s+Qj8vrfr+PL7XoAAAAAAAAAAAAzKbBCwAAAAAAAAAAoCkNXgAAAAAAAAAAAE1p8AIAAAAAAAAAAGhKgxcAAAAAAAAAAEBTGrwAAAAAAAAAAACa0uAFAAAAAAAAAADQlAYvAAAAAAAAAACApjR4AQAAAAAAAAAANKXBCwAAAAAAAAAAoCkNXgAAAAAAAAAAAE1p8AIAAAAAAAAAAGhKgxcAAAAAAAAAAEBTGrwAAAAAAAAAAACa0uAFAAAAAAAAAADQlAYvAAAAAAAAAACApjR4AQAAAAAAAAAANKXBCwAAAAAAAAAAoCkNXgAAAAAAAAAAAE1p8AIAAAAAAAAAAGhKgxcAAAAAAAAAAEBTGrwAAAAAAAAAAACa0uAFAAAAAAAAAADQlAYvAAAAAAAAAACApjR4AQAAAAAAAAAANKXBCwAAAAAAAAAAoCkNXgAAAAAAAAAAAE1p8AIAAAAAAAAAAGhKgxcAAAAAAAAAAEBTGrwAAAAAAAAAAACa0uAFAAAAAAAAAADQ1NMYYzx+PR+P3z///s2Rm6QcKjhnJdax4EWWhiXXoeiYnVjT9crWau5FRksiuV4LEsvOWZkwOCxaq8nEypNOnW739dq7VnPJ9z0DJOfbe73m12pxv48NyoqtV/l/dsVBJxSqbZ0uOKNNrtXoeiX/Z8tzTg4VrdUVG1NkyMmBGdH1WnA8nl+rn3+9ltzJK5F2PnOMEV2v6We0trW6IrHCdAtqtet67V2rzqsno8WGLbmTT56v6110/1r9/OuVrdXci2x7vp+cWN8zQC5WPdTkD4d3r9XJ67V/rU7+LmD7Wt13vdbUamG/L8f6r0xOm/8ZxjW/O7ndbv/2hwAAAAAAAAAAAHy8FwBxZPolNJMXAAAAAElFTkSuQmCC'
          ></image>
        </defs>
      </svg>
    </Box>
  )
}

export default Novatech
