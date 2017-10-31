
let initialState = {
  lights:[],
  serveId:'',
}
initialState = {}
export default function(state= initialState,action){
  switch (action.type) {
    case 'GETSERVEID':
      return {...state, "serveId":action.serveId}
    case 'GETLIGHTWAYS':
      return {...state,"lights": action.lights}
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
