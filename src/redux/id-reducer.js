import Immutable from 'seamless-immutable'

const initialState = {
  token:'',
  houseId:'',
  customerId:'',
  serveId:''
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
      case 'SERVERID':
      return Immutable.set(state,'serveId',action.data)
    default:
      return state;
  }
};