import React, { useRef, useState } from 'react'
import server from 'base/ioc'
import { BootProvider, Provides, useInjection } from 'base/di/provider'
import { Client, FinancialApis, UserApis } from 'service'

const provides: Provides = [
  Client,
  // UserApis,
  { identifier: UserApis, constr: UserApis},
  // FinancialApis
]

export default function App() {
  server.doSomething()
  return (
    <BootProvider provides={provides}>
      <div>
        <h1>React App</h1>
        <p>React App with TypeScript123</p>
        <Child />
      </div>
    </BootProvider>
  )
}

function Child() {
  const userApis = useInjection(UserApis)
  userApis.getUser()
  return (
    <div>
      <h1>Child</h1>
      <p>Child component</p>
    </div>
  )
}