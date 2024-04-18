import { injectable } from 'inversify'
import { action, makeObservable, observable } from 'mobx'

@injectable()
export class Client {
  fetch(method: string) {
    console.log('fetching...', method)
  }
}

@injectable()
export class UserApis {
  @observable age: number = 1
  constructor(private client: Client) {
    makeObservable(this)
  }
  getUser() {
    this.client.fetch('getUser')
    console.log('getUser...')
  }
  @action.bound
  add() {
    this.age = this.age + 1
    console.log(this.age)
  }
}

@injectable()
export class FinancialApis {
  @observable count: number = 1
  constructor() {
    makeObservable(this)
  }
  @action.bound
  add() {
    this.count += 1
    console.log(this.count)
  }
}
