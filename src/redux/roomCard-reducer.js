import {fromJS} from 'immutable'

const initialState = {
  deviceId:''
}

export default function(state=initialState,action){
  switch (action.type) {
    case 'INITIAL':
      return fromJS(state).set('deviceId',action.deviceId).toJS()
    default:
        return state
  }
}