import {fromJS} from 'immutable';

const initialState = {
  models:[]
};
export default function(state=initialState,action){
  switch (action.type) {
    case 'INITIALSTATE':
      return fromJS(state).set('models',action.data).toJS()
    default:
        return state
  }
}
