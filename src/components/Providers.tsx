// Type Imports
import type { ChildrenType, Direction } from '@core/types'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'

// Util Imports
import { getDemoName, getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'
import ModalProvider from '@/contexts/ModalProvider'
import ModalLayout from './layout/ModalLayout'
import ToastProvider from '@/contexts/ToastProvider'
import AuthProvider from '@/contexts/AuthProvider'
import StoreProvider from '@/store/contexts/StoreProvider'
import SessionProvider from '@/contexts/SessionProvider'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = (props: Props) => {
  // Props
  const { children, direction } = props

  // Vars
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()
  const demoName = getDemoName()
  const systemMode = getSystemMode()

  return (
    <SessionProvider>
      <StoreProvider>
        <ModalProvider>
          <AuthProvider>
            <VerticalNavProvider>
              <SettingsProvider settingsCookie={settingsCookie} mode={mode} demoName={demoName}>
                <ThemeProvider direction={direction} systemMode={systemMode}>
                  {children}
                  <ModalLayout />
                  <ToastProvider />
                </ThemeProvider>
              </SettingsProvider>
            </VerticalNavProvider>
          </AuthProvider>
        </ModalProvider>
      </StoreProvider>
    </SessionProvider>
  )
}

export default Providers
