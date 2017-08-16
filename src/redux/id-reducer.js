import Immutable from 'seamless-immutable'

const initialState = {
  token:'',
  houseId:'',
  customerId:''
}
export default (state = Immutable(initialState),action)=>{
  switch (action.type) {
    case 'SAVE':
      const idState = {
        token:action.token,
        houseId:action.houseId,
        customerId:action.customerId
      } 
      return Immutable.merge(state, idState)
    default:
      return state;
  }
};