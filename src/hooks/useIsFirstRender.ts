import { useRef } from 'react'

// 判断是否是第一次渲染
export function useIsFisrtRender() {
  const isFirst = useRef(true)
  if (isFirst.current) {
    isFirst.current = false

    return true
  }
  return isFirst.current
}
