import {fromJS} from 'immutable';

const initialState = {
  userName:localStorage.getItem('userName')||'',
  password:localStorage.getItem('password')||'',
  isRemenber:localStorage.getItem('isRemenber')||false,
  deleteTime:localStorage.getItem('deleteTime')
};
export default (state = initialState,action)=>{
  switch (action.type) {
    case 'REMOVELOCALDATA':
      return fromJS(state).set('userName','').set('password','').set('isRemenber',false).toJS();
    case 'CHANGEUSERANDPASSWORD':
      return fromJS(state).set(action.name,action.value).toJS();
    case 'CHANGEREMEMBER':
      return fromJS(state).set('isRemenber',action.value).toJS();
    default:
      return state;
  }
};