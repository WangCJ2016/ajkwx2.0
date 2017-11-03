
let initialState = {
  lights:[],
  serveId:'',
  middleRoundStatus:'卧室'
}

export default function(state= initialState,action){
  switch (action.type) {
    case 'GETSERVEID':
      return {...state, "serveId":action.serveId}
    case 'GETLIGHTWAYS':
      return {...state,"lights": action.lights}
    case 'CHANGEMIDDLESTATUS':
      return {...state,"middleRoundStatus": action.class}
    case 'CHANGELIGHTSTATUS':
        const lights = state.lights.map((light, index) => {
          if (index === action.id) {
            light.status = action.status
          } 
          return light
        })
        return {...state, 'lights': lights}
    default:
      return state
  }
}
