import Immutable from 'seamless-immutable'

let initialState 
if(localStorage.getItem('deleteTime')>= new Date().getTime()){
   initialState = {
      userName:localStorage.getItem('userName')||'',
      password:localStorage.getItem('password')||'',
      isRemenber:localStorage.getItem('isRemenber')||false,
      deleteTime:localStorage.getItem('deleteTime')
  }
}else{
   initialState = {
      userName:'',
      password:'',
      isRemenber:false,
      deleteTime:''
  }
}


export default (state = Immutable(initialState),action)=>{
  switch (action.type) {
    case 'CHANGEUSERANDPASSWORD':
      return Immutable.set(Immutable(state),action.name,action.value)
    case 'CHANGEREMEMBER':
      return Immutable.set(Immutable(state),'isRemenber',action.value)
    default:
      return state;
  }
};