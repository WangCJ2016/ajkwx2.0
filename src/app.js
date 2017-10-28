import ReactDOM from 'react-dom'
import React from 'react'
import { hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import initReactFastclick from 'react-fastclick'


import configureStore from './store'
import routes from './routes'
import './assets/normalize.css'

const store = configureStore()
const history = hashHistory

initReactFastclick()
ReactDOM.render(
  <Provider store={store}>
    { routes(history) }
  </Provider>
,document.getElementById('root'))