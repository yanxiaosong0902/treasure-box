import { DependencyList, EffectCallback, useEffect } from 'react'

import { useIsFisrtRender } from './useIsFirstRender'

// 不是第一次渲染时执行effect
export function useUpdateEffect(effect: EffectCallback, deps: DependencyList) {
  const isFisrtRender = useIsFisrtRender()
  useEffect(() => {
    if (!isFisrtRender) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
