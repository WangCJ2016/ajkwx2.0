import {combineReducers} from 'redux'

import loginStore from './login-reducer'
import lightStore from './light-reducer'
import airStore from './air-reducer'

export default combineReducers({loginStore,lightStore,airStore})