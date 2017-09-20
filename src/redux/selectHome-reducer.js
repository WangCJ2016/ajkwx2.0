import Immutable from 'seamless-immutable'

const initialState = {
  rooms: []
};
export default function(state=Immutable(initialState),action){
  switch (action.type) {
    case 'INTIAL':
      return Immutable.set(Immutable(state),'rooms', action.rooms)
     default:
        return state;
  }
}
