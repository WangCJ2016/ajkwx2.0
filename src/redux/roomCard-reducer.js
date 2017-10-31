
const initialState = {
  deviceId:''
}

export default function(state=initialState, action){
  switch (action.type) {
    case 'INITIAL':
      return {...state,'deviceId': action.deviceId}
    default:
        return state
  }
}