export type IGenerateResFn = {
  status: boolean
  message?: string | null
  data?: Record<any, any> | null
}

export type IGenerateResReturn = IGenerateResFn & {
  message: Exclude<IGenerateResFn['message'], undefined>
  data: any
}

/**
 * @param args IGenerateResFn
 * @returns Response obj, created using given args
 */

const generateRes = (args: IGenerateResFn): IGenerateResReturn => {
  const { status, message = null, data = null } = args
  return {
    status,
    message,
    data
  }
}

export { generateRes }
