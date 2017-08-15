import Immutable from 'seamless-immutable'

const initialState = {
  token:'',
  houseId:'',
  customerId:''
};
export default (state = Immutable(initialState),action)=>{
  switch (action.type) {
    case 'SAVE':
      return Immutable.set(Immutable(state),'customerId',action.customerId).set(Immutable(state),'token',action.token).set(Immutable(state),'houseId',action.houseId)
    default:
      return state;
  }
};