import {fromJS} from 'immutable';

const initialState = {
  token:'',
  houseId:''
};
export default (state = initialState,action)=>{
  switch (action.type) {
    case 'SAVE':
      return fromJS(state).set('token',action.token).set('houseId',action.houseId).set('customerId':action.customerId).toJS();
    default:
      return state;
  }
};