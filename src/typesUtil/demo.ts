interface Person {
  name: string;
  age: number;
  gender: number
}

const person: Partial<Person> = {
  name: 'John'
}

const person2: Required<Person> = {
  name: 'John',
  age: 30,
  gender: 1
}

const person3: Readonly<Person> = {
  name: 'John',
  age: 30,
  gender: 1
}

const person4: Pick<Person, 'name' | 'age' | 'gender'> = {
  name: 'test',
  age: 20,
  gender: 1
}

const person5: Pick<Person, 'name' & 'age'> = {
  name: 'test'
}

// person5.name // 报错

const person6: Omit<Person, 'name' | 'age'> = {
  gender: 1
}

console.log(person, person2, person3, person4)

interface obj1 {
  a: string
  b: string
}

interface obj2 {
  c?: string
  d: string
}

type obj3 = obj1 & obj2

const obj: obj3 = {
  a: '1',
  b: '2',
  // c: '3',
  d: '4'
}

enum Status {
  success = 200,
  error = 400,
  warning = 300,
  cancel = 'cancel'
}

type StatusKeys = keyof typeof Status // "success" | "error" | "warning" | "cancel"
