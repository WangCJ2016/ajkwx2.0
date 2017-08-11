import React from 'react'
import {Router, Route, IndexRoute } from 'react-router'

import Frame from '../layout/frame'
import Login from '../view/login/login'
import Light from '../view/light/light'
import Service from '../view/service/service'
import RoomCard from '../view/roomCard/roomCard'
import Models from '../view/models/models'
import Home from '../view/home/home'
import Curtain from '../view/curtain/curtain'
import Tv from '../view/tv/tv'
import Air from '../view/air/air'

const routes = history => (
    <Router history={history}>
      <Route path='/' component={Frame}>
        <IndexRoute component={Login}/>
        <Route path='/light' component={Light} />
        <Route path='/service' component={Service} />
        <Route path='/lock' component={RoomCard} />
        <Route path='/model' component={Models} />
        <Route path='/home' component={Home} />
        <Route path='/curtain' component={Curtain} />
        <Route path='/tv' component={Tv} />
        <Route path='/air' component={Air} />
      </Route>
    </Router>
  )
export default routes