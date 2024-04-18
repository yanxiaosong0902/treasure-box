// 这是里基本的依赖注入的实现，使用了 inversify 这个库

import { Container, inject, injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'
import 'reflect-metadata'

const TYPES = {
  Logger: Symbol.for('Logger'),
  Client: Symbol.for('Client'),
  MockStore: Symbol.for('MockStore')
}

// Implement classes
@injectable()
class Logger {
  log(message: string) {
    console.log(message)
  }
}

@injectable()
class Client {
  fetch(method: string) {
    console.log('fetching...', method)
  }
}

@injectable()
class MockStore {
  constructor(
    @inject(TYPES.Client) private client: Client
  ) {

  }
  save() {
    this.client.fetch('mockstore')
    console.log('saving...')
  }
}

@injectable()
class Service {
  @observable age: number = 1
  // 这里是属性注入, 通过 @inject(TYPES.MockStore) 来注入,注意: mock! 这里要加感叹号,不然会报错
  @inject(TYPES.MockStore)
  private mock!: MockStore
  // 这里注入 Logger 是通过构造函数注入的, 并且 Logger 的 identifier 是 Logger 类本身, 所以跟不需要inject(identifier)也可以自动注入
  // 这里注入 Client 是通过构造函数注入的, 并且 Client 的 identifier 是容器绑定的 Client 类的 identifier, 所以这里的 identifier 是 TYPES.Client, 所以通过 @inject(TYPES.Client) 来注入
  constructor(private logger: Logger, @inject(TYPES.Client) private client: Client) {
    makeObservable(this)
  }

  doSomething() {
    this.mock.save()
    this.client.fetch('service')
    this.logger.log('Doing something...')
  }

  add() {
    this.age += 1
  }
}

// Create container and bind dependencies
const container = new Container()
container.bind<Logger>(Logger).to(Logger)
// 如果是绑定到自身,那么可以直接使用 toSelf
// container.bind<Logger>(Logger).toSelf();
container.bind<Client>(TYPES.Client).to(Client)
container.bind<Service>(Service).to(Service)
container.bind<MockStore>(TYPES.MockStore).to(MockStore)

// Resolve dependencies and use the service
const service = container.get<Service>(Service)
const mocker = container.get<MockStore>(TYPES.MockStore)
mocker.save()
export default service
// service.doSomething();
