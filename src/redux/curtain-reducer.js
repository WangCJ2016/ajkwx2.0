import Immutable from 'seamless-immutable'

const initailState = {
  curtains:[],
  type: 0
};

export default function(state=Immutable(initailState),action){
  switch (action.type) {
    case 'INITIALSTATE':
      return Immutable.set(Immutable(state),'curtains',action.data)
    case 'INITIALSTATETYPE':
      return Immutable.set(Immutable(state),'type',action.data)
    default:
        return state;
  }
}
