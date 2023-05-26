import { lazy } from 'react'
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import {store} from './store/store'
import {Provider}  from "react-redux"

import './index.css'
const LazyApp = lazy(() => import("./App"))

const container = document.getElementById("root")
const root = createRoot(container)

root.render(

  <BrowserRouter>
    <Provider store={store}>
      <LazyApp />
    </Provider>
  </BrowserRouter>
  
)
