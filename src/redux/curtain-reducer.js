import {fromJS} from 'immutable';
const initailState = {
  curtains:[]
};

export default function(state=initailState,action){
  switch (action.type) {
    case 'INITIALSTATE':
      return fromJS(state).set('curtains',action.data).toJS();
      break;
    default:
        return state;
  }
}
