import {fromJS} from 'immutable'

const initialState = {
  airs:[],
  deviceType:''
};
export default function(state=initialState,action){
  switch (action.type) {
    case 'INTIALDATA':
      return fromJS(state).set(action.style,action.data).toJS()
     default:
        return state;
  }
}
