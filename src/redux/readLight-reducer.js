import Immutable from 'seamless-immutable'

const initialState = {
  deviceId: '',
  housId:''
};
export default function(state=Immutable(initialState),action){
  switch (action.type) {
    case 'INTIALDATA':
      return Immutable.set(Immutable(state),action.style,action.data)
     default:
        return state;
  }
}
