import React from 'react'
import { createRoot } from 'react-dom/client'
import { configure } from 'mobx'
import App from 'components/App'

configure({ enforceActions: 'observed' })

const rootElement = document.getElementById('root')

const rooter = createRoot(rootElement as any)

rooter.render(<App />)
