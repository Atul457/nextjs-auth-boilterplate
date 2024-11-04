interface ICapitalizeOptions {
  /** @info Default `true`, if `true` then capitalizes first letter of each word  */
  capitalizeAll?: boolean
  /** @info Default `false`, if `true` then capitalizes each letter of each word  */
  fullyCapitalize?: boolean
  /** @info If `valueToGenerateStringFrom` is a falsy value, then returnValueIfNotString is returned if passed  */
  returnValueIfNotString?: any
}

type ICapitalizeReturnValue<T extends ICapitalizeOptions> =
  T['returnValueIfNotString'] extends Exclude<any, undefined> ? string : T['returnValueIfNotString']

export type ICapitalize = <T extends ICapitalizeOptions>(
  valueToCapitalize: any,
  options?: T
) => ICapitalizeReturnValue<T>

export type IGetExpiryTimeDurationArgs = {
  duration: `${number}${'sec' | 'min' | 'hr' | 'day' | 'mon' | 'yr'}` | 'infinity'
}

export type IGetExpiryTime = (args: IGetExpiryTimeDurationArgs) => number
