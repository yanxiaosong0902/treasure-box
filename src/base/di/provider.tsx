import { Container } from 'inversify'
import React, { createContext, useContext } from 'react'


/** 类（class）定义，包括抽象类（abstract class） */
// TODO: ts 4.2 后支持 abstract-construct-signatures
// eslint-disable-next-line
export type Class<T> = Function & { prototype: T }

/** 类（class） */
export type Newable<T> = new (...args: any[]) => T;

export interface Abstract<T> {
  prototype: T;
}

/** 注入用的标识 */
// export type Identifier<T> = string | symbol | Abstract<T>

export type Identifier<T = unknown> = (string | symbol | Newable<T> | Abstract<T>);

/** Container（依赖注入行为的容器） */
export interface IContainer {
  /** 父容器 */
  parent: IContainer | null
  /** 从容器中获得被依赖对象 */
  get<T>(identifier: Identifier<T>): T
  /** 检查给定 identifier 在容器中是否被绑定（有对应的 provide pair） */
  isBound(identifier: Identifier<unknown>): boolean
}

/** 注入函数 */
export type InjectFunc = <T>(identifier: Identifier<T>) => T

/** 指定构造函数的 provide 对，把指定标识绑定到指定的构造函数（类） */
export type ConstrProvidePair<V, T = V> = {
  identifier: Identifier<T>
  constr: Newable<V>
}

/** 指定值的 provide 对，把指定标识绑定到指定的值 */
export type ValueProvidePair<V, T = V> = {
  identifier: Identifier<T>
  value: V
}

/** 指定工厂函数的 provide 对，把指定标识绑定到指定的工厂函数 */
export type FactoryProvidePair<V, T = V> = {
  identifier: Identifier<T>
  factory: (inject: InjectFunc) => V
}

/** provide 对，包含构造指定标识所对应的值的逻辑，将指定的标识绑定到指定的类、值或工厂函数 */
export type ProvidePair<V = unknown, T = V> = (
  ConstrProvidePair<V, T>
  | ValueProvidePair<V, T>
  | FactoryProvidePair<V, T>
)

function isNewable(v: unknown): v is Newable<unknown> {
  return typeof v === 'function'
}

export type Provides = Array<ProvidePair | Newable<unknown>>

// export type NewProvide = Array<<T extends abstract new (...args: any) => unknown>(target: T) => T>

export interface Props {
  /** 提供（provide）的信息集合 */
  provides?: Provides
  /** 指定的依赖注入容器 */
  container?: IContainer
  /** 构造依赖注入容器的选项 */
  // options?: ContainerOptions
  /** 内容 */
  children?: React.ReactNode
}

export type IContext = {
  container: IContainer | undefined
}

/** 在 react 组件树中传递用的 context 定义 */
const context = createContext<IContext>({
  container: undefined
})

/** 判断是否指定构造函数的 provide 对 */
export function isConstrProvidePair<V, T = V>(providePair: ProvidePair<V, T>): providePair is ConstrProvidePair<V, T> {
  return (providePair as ConstrProvidePair<V, T>).constr != null
}

/** 判断是否指定值的 provide 对 */
export function isValueProvidePair<V, T = V>(providePair: ProvidePair<V, T>): providePair is ValueProvidePair<V, T> {
  return 'value' in (providePair as ValueProvidePair<V, T>)
}

/** 判断是否指定工厂函数的 provide 对 */
// eslint-disable-next-line max-len
export function isFactoryProvidePair<V, T = V>(providePair: ProvidePair<V, T>): providePair is FactoryProvidePair<V, T> {
  return (providePair as FactoryProvidePair<V, T>).factory != null
}

export default function Provider(props: Props) {
  // 上下文里获取的 container
  // const containerFromCtx = useContext(context).container
  const container = new Container()
  const provides = props.provides?.map((item) => {
    if (isNewable(item)) {
      return {
        identifier: item,
        constr: item
      }
    }
    return item
  })
  if (provides) {
    provides.forEach((provide: any) => {
      if (isConstrProvidePair(provide)) {
        container.bind(provide.identifier).to(provide.constr)
        return
      }
      if (isValueProvidePair(provide)) {
        container.bind(provide.identifier).toConstantValue(provide.value)
        return
      }
      if (isFactoryProvidePair(provide)) {
        container.bind(provide.identifier).toDynamicValue((context) => provide.factory(context.container.get.bind(context.container)))
        return
      }
      // if ('constr' in provide) {
      //   container.bind(provide.identifier).to(provide.constr)
      // } else if ('value' in provide) {
      //   container.bind(provide.identifier).toConstantValue(provide.value)
      // } else if ('factory' in provide) {
      //   container.bind(provide.identifier).toDynamicValue((context) => provide.factory(context.container.get.bind(context.container)))
      // } else {
      //   throw new Error('Invalid provide pair')
      // }
    })
  }

  return (
    <context.Provider value={{container}}>
      {props.children}
    </context.Provider>
  )
}

export function useContainer() {
  return useContext(context).container
}

export function BootProvider(props: Props) {
  return (
    <Provider provides={props.provides}>
      {props.children}
    </Provider>
  )
}

// 定义一个类的范型
export type ClassType<T> = new (...args: any[]) => T

export function useInjection<T>(identifier: Identifier<T>): T {
  const container = useContainer()
  return container!.get(identifier)
}