// Partial<T> - Makes all properties in T optional
// export type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

// Required<T> - Makes all properties in T required
// 把可选参数都变成必选参数
// export type Required<T> = {
//   [P in keyof T]-?: T[P];
// };

// Readonly<T> - Makes all properties in T readonly
// 把所有参数都变成只读参数
// export type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };

// Record<K, T> - Constructs an object type with set of properties K of type T
// 生成一个对象类型，这个对象类型的key是K，value是T
// export type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

// Pick<T, K> - From T, pick a set of properties whose keys are in the union K
// 从类型T中挑选出T的某些属性, 其余属性都不要
// export type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

// Omit<T, K> - Construct a type with all properties of T except for those in set K.
// 从类型T中挑选出T的某些属性, 其余属性都要
// export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Exclude<T, U> - Exclude from T those types that are assignable to U
// 意思是从类型T中排除掉U中的类型
// 例如：Exclude<'a' | 'b' | 'c', 'a'> => 'b' | 'c'
// 这里的过程是 ('a' extends 'a' ? never : 'a') | ('b' extends 'a' ? never : 'b') | ('c' extends 'a' ? never : 'c'
// 所以结果是 'b' | 'c'
// 再比如 type c =('a' | 'b' | 'c') extends ('a' | 'd') ? never : 'a' | 'b' | 'c';
// 完整过程是 type c = ('a' extends 'a' | 'd' ? never : 'a') | ('b' extends 'a' | 'd' ? never : 'b') | ('c' extends 'a' | 'd' ? never : 'c');
// 所以结果是 'b' | 'c'
// export type Exclude<T, U> = T extends U ? never : T;

// Extract<T, U> - Extract from T those types that are assignable to U
// 从类型T中提取出T中的某些属性
// export type Extract<T, U> = T extends U ? T : never;

// NonNullable<T> - Exclude null and undefined from T
// 从类型T中排除掉null和undefined
// export type NonNullable<T> = T extends null | undefined ? never : T;

// infer 的一些例子
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// 上面的意思是，如果T是一个函数，那么返回值就是R，否则返回any
// 举例说明
// type Func = () => number;
// type Return = ReturnType<Func>; // number
// infer的意思是推断，这里的推断是推断函数的返回值

// Optional, 指定某些参数是可选的
// 先用 Omit 把不需要的参数 K 去掉, 剩下的都是必选参数
// 然后 用 Pick 把需要的参数 K 选出来, 然后用 Partial 把这些参数变成可选参数
// 最后用 & 连接起来
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** 类（class） */
// 类型 Newable 是一个函数类型，这个函数类型是一个构造函数
export type Newable<T> = new (...args: any[]) => T;

// 类型 Abstract 是一个接口类型，这个接口类型有一个属性 prototype，这个属性的类型是 T
// 作用是用来约束一个类的原型
export interface Abstract<T> {
  prototype: T;
}

// 获取枚举类型的Key
// 通过 keyof 获取枚举类型的所有 key
// export type EnumKeys = keyof typeof Enum; // 返回 Enum 的所有 key 的联合类型
// 例如: enum Status = { 'success': 0, 'error': 1 }
// type EnumKeys = keyof typeof Status; // 返回 'success' | 'error'

