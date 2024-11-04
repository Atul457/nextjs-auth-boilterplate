const isLocalEnv = process.env.NEXT_PUBLIC_APP_HOSTNAME === 'local'

const NEXT_PUBLIC_APP_HOSTNAME = process.env.NEXT_PUBLIC_APP_HOSTNAME?.replace(/:[\d]+/gi, '')
const STORAGE_PATH = !isLocalEnv
  ? `${NEXT_PUBLIC_APP_HOSTNAME}/${process.env.NEXT_PUBLIC_APP_PREFIX}/public`
  : `${NEXT_PUBLIC_APP_HOSTNAME}`

export const APP_CONST = {
  DASHBOARD: {},
  CONFIG: {
    TERMS: `${process.env.NEXT_PUBLIC_APP_HOSTNAME}/terms`,
    PRIVACY: `${process.env.NEXT_PUBLIC_APP_HOSTNAME}/policy`,
    STORAGE_PATH
  },
  DATE: {
    DATE_FORMAT: 'dd MMM yyyy'
  }
}
