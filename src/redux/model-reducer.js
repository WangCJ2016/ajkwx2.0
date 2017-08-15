import Immutable from 'seamless-immutable'

const initialState = {
  models:[]
};
export default function(state=Immutable(initialState),action){
  switch (action.type) {
    case 'INITIALSTATE':
      return Immutable.set(Immutable(state),'models',action.data)
    default:
        return state
  }
}
