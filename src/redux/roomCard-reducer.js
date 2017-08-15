import Immutable from 'seamless-immutable'

const initialState = {
  deviceId:''
}

export default function(state=Immutable(initialState),action){
  switch (action.type) {
    case 'INITIAL':
      return Immutable.set(Immutable(state),'deviceId',action.deviceId)
    default:
        return state
  }
}