import { IInitialUserSliceState } from '@/store/types'

const initialState: IInitialUserSliceState = {
  data: {
    user: null
  },
  status: 'loading',
  message: null
}

const USER_CONST = {
  initialState
}

export { USER_CONST }
