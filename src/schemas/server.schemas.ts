import { commonSchemas } from './common.schemas'

const register = commonSchemas.registerStep1.concat(commonSchemas.registerStep2).clone().shape({})

const serverSchemas = {
  register
}

export { serverSchemas }
