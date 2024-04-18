import { DependencyList, useCallback, useEffect, useRef, useState } from 'react'

// 防抖, 使一个state在一段时间内不变化后才更新
export function useDebounceValue<T>(value: T, delay = 200): T {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounceValue
}

// 防抖, 使一个useCallback函数在一段时间内不被更新后才执行
export function useDebounce<T extends(...args: any[]) => any>(
  fn: T, dep: DependencyList = [], delay = 100): T {
  const { current } = useRef<{fn: T, timer: any}>({ fn, timer: null })
  useEffect(() => {
    current.fn = fn
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args) => {
    if (current.timer) {
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(() => {
      current.fn.call(undefined, ...args)
    }, delay)
  }) as T, dep)
}
