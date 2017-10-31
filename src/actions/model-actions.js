import { request, config } from '../utlis'

const houseId = sessionStorage.getItem('houseId')
const token = sessionStorage.getItem('token')
const deviceType = 'SCENE';

export function initialModel(){
  return (dispatch,getState)=>{
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
