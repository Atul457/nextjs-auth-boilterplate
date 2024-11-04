// Third-party Imports
import styled from '@emotion/styled'

// Config Imports
import themeConfig from '@configs/themeConfig'
import { screens } from '@/@core/tailwind/screen'

type StyledMainProps = {
  isContentCompact: boolean
}

const StyledMain = styled.main<StyledMainProps>`
  @media (min-width: ${screens.md}) {
    padding: ${themeConfig.layoutPadding}px;
  }
  @media (max-width: ${screens.md}) {
    padding: ${themeConfig.layoutPadding - 6}px;
  }
  ${({ isContentCompact }) =>
    isContentCompact &&
    `
    margin-inline: auto;
    max-inline-size: ${themeConfig.compactContentWidth}px;
  `}
`

export default StyledMain
