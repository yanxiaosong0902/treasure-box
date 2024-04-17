import { injectable } from 'inversify'

@injectable()
export class Client {
  fetch(method: string) {
    console.log('fetching...', method)
  }
}

@injectable()
export class UserApis {
  constructor(private client: Client) {
  }
  getUser() {
    this.client.fetch('getUser')
    console.log('getUser...')
  }
}

@injectable()
export class FinancialApis {
  constructor(private client: Client) {
  }
  getFinancial() {
    this.client.fetch('getFinancial')
    console.log('getFinancial...')
  }
}
