import {fromJS} from 'immutable';

const initialState = {
  token:'',
  houseId:'',
  customerId:''
};
export default (state = initialState,action)=>{
  switch (action.type) {
    case 'SAVE':
      return fromJS(state).set('customerId',action.customerId).set('token',action.token).set('houseId',action.houseId).toJS();
    default:
      return state;
  }
};