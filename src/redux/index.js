import {combineReducers} from 'redux'

import idStore from './id-reducer'
import loginStore from './login-reducer'
import lightStore from './light-reducer'
import airStore from './air-reducer'
import roomCardStore from './roomCard-reducer'
import serviceStore from './service-reducer'
import modelStore from './model-reducer'
import tvStore from './tv-reducer'
import curtainStore from './curtain-reducer'

export default combineReducers({loginStore,lightStore,airStore,idStore,roomCardStore,serviceStore,modelStore,tvStore,curtainStore})