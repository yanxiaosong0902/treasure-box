import React from 'react'
import server from 'base/ioc'
import { BootProvider, Provides, useInjection } from 'base/di/provider'
import { Client, FinancialApis, UserApis } from 'service'
import { observer } from 'mobx-react'

const provides: Provides = [
  Client,
  // UserApis,
  { identifier: UserApis, constr: UserApis},
  { identifier: FinancialApis, value: new FinancialApis()},
]

export default observer(function App() {
  server.doSomething()
  return (
    <BootProvider provides={provides}>
      <div>
        <h1>React App</h1>
        <p>React App with TypeScript123</p>
        <p>server age: {server.age}</p>
        <button onClick={() => server.add()}>add age</button>
        <Child />
        <Brother />
      </div>
    </BootProvider>
  )
})

const Brother = observer(() => {
  const financialApis = useInjection(FinancialApis)
  return (
    <div>
      <h1>
        count: {financialApis.count}
        <button onClick={() => financialApis.add()}>add</button>
      </h1>
      <p>Brother component</p>
    </div>
  )
})

const Child = observer(() => {
  const userApis = useInjection(UserApis)
  // userApis.getUser()
  const financialApis = useInjection(FinancialApis)
  // financialApis.add()
  return (
    <div>
      <h1>
        user age: {userApis.age}
        <button onClick={() => userApis.add()}>growup age</button>
      </h1>
      <h2>
        count: {financialApis.count}
        <button onClick={() => financialApis.add()}>add</button>
      </h2>
      <p>Child component</p>
    </div>
  )
})