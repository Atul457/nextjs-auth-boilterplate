'use client'

import { utils } from '@/utils/utils'
import { useEffect, useRef, useState } from 'react'

type IGetKeyFunctionArgs = { key: string }
type IValue = string | Record<string, any> | null
type ISetKeyFunctionArgs = { key: string; value: IValue }
type IRemoveKeyFunctionArgs = Omit<ISetKeyFunctionArgs, 'value'>
type IGetKeyFunction = (args: IGetKeyFunctionArgs) => IValue
type ISetKeyFunction = (args: ISetKeyFunctionArgs) => void
type IRemoveKeyFunction = (args: IRemoveKeyFunctionArgs) => void

const useLocalStorage = () => {
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState<IValue>(null)
  const value_ = useRef<IValue>(null)

  useEffect(() => {
    setLoading(false)
  }, [])

  const getKey: IGetKeyFunction = args => {
    if (!utils.dom.isWindowPresent()) {
      return value_.current
    }

    const value = localStorage.getItem(`${process.env.NEXT_PUBLIC_APP_PREFIX}_${args.key.toLocaleLowerCase()}`)
    const isJson = value ? utils.json.isJson(value) : false

    let keysValue = isJson ? utils.json.getParsedJson(value) : value

    if (JSON.stringify(keysValue) === JSON.stringify(value_.current)) {
      return keysValue
    } else {
      value_.current = keysValue
      setValue(keysValue)
    }
    return keysValue
  }

  const removeKey: IRemoveKeyFunction = args => {
    if (!utils.dom.isWindowPresent()) {
      return
    }

    localStorage.removeItem(`${process.env.NEXT_PUBLIC_APP_PREFIX}_${args.key.toLocaleLowerCase()}`)
  }

  const setKey: ISetKeyFunction = args => {
    if (!utils.dom.isWindowPresent()) {
      return
    }

    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_APP_PREFIX}_${args.key.toLocaleLowerCase()}`,
      args.value ? (typeof args.value === 'object' ? JSON.stringify(args.value) : args.value) : ''
    )
    value_.current = args.value
    setValue(args.value)
  }

  return {
    getKey,
    instantValue: value_.current,
    setKey,
    loading,
    value,
    removeKey
  }
}

export default useLocalStorage
