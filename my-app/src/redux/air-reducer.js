import {fromJS} from 'immutable';
import * as airActions from '../actions/air-actions';

const initialState = {
  airs:[],
  deviceType:''
};
export default function(state=initialState,action){
  switch (action.type) {
    case 'INTIALDATA':
      return fromJS(state).set(action.style,action.data).toJS()
  }
  return state;
}
