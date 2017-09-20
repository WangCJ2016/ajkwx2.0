import Immutable from 'seamless-immutable'

const initialState = {
  token:'',
  customerId:'',
  serveId:'',
  houseId: ''
}
export default (state = Immutable(initialState),action)=>{
  switch (action.type) {
    case 'SAVE':
      const idState = {
        token:action.token,
        customerId:action.customerId
      } 
      console.log(idState)
      return Immutable.merge(state, idState)
    case 'SERVERID':
      return Immutable.set(state,'serveId',action.data)
    case 'SAVEHOUSEID':
      return Immutable.set(state,'houseId',action.houseId)
    default:
      return state;
  }
};