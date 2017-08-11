import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'SCENE';

export function initialModel(){
  return (dispatch,getState)=>{
    const token = getState().idStore.token || token_session
    const houseId = getState().idStore.houseId || houseId_session
    request.get(config.api.base + config.api.queryHostScenes, { houseId: houseId, token: token })
         .then(res => {
             console.log(res)
             dispatch(initialState(res.dataObject))
         })
  };
}
function initialState(data){
  return{
    type:'INITIALSTATE',
    data:data
  };
}
 
export function changeModel(scenceId){
  return (dispatch,getState) => {
    const token = getState().idStore.token || token_session
    const houseId = getState().idStore.houseId || houseId_session
    request.get(config.api.base + config.api.smartHostControl, {
      token:token,
      houseId:houseId,
      sceneId:scenceId,
      deviceType:deviceType
    })
    .then(res => {
      console.log(res)
    })
  }
}
