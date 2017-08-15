import Immutable from 'seamless-immutable'

const initailState = {
  curtains:[]
};

export default function(state=Immutable(initailState),action){
  switch (action.type) {
    case 'INITIALSTATE':
      return Immutable.set(Immutable(state),'curtains',action.data)
    default:
        return state;
  }
}
