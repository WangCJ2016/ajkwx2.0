import Immutable from 'seamless-immutable'

let initialState = {
  models:[],
  lights:[]
}
initialState = Immutable(initialState)
export default function(state=initialState,action){
  switch (action.type) {
    case 'GETMODELSCENE':
      return Immutable.set(Immutable(state),"models",action.models)
    case 'GETLIGHTWAYS':
      return Immutable.set(Immutable(state),"lights",action.lights)
    case 'CHANGELIGHTSTATUS':
        return Immutable.setIn(Immutable(state),['lights',action.id,'status'],action.status)
    default:
      return state
  }
}
