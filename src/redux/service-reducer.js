import {fromJS} from 'immutable'

const initailState = {
  lights:[]
}
export default function(state=initailState,action){
  switch (action.type) {
    case 'SETWAY':
      return fromJS(state).set('lights',action.lights).toJS();
    default:
      return state
  }
}
