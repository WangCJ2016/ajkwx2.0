import Immutable from 'seamless-immutable'

const initailState = {
  lights:[]
}
export default function(state=Immutable(initailState),action){
  switch (action.type) {
    case 'SETWAY':
      return Immutable.set(Immutable(state),'lights',action.lights)
    default:
      return state
  }
}
