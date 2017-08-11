import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'CURTAIN'

export function initialCurtain(){
  return (dispatch,getState)=>{
    const token  = getState().idStore.token||token_session
    const houseId  = getState().idStore.houseId||houseId_session
    request.get(config.api.base + config.api.queryHostDeviceByType,{houseId:houseId,token:token,deviceType:deviceType})
    .then(res => {
      console.log(res)
      if(res&&res.success){
        dispatch(initialState(res.dataObject))
      }
    })
  }
}
export function changeCurtainStatus(wayId,key,brightness){
  return (dispatch,getState)=>{
    const token  = getState().idStore.token||token_session
    const houseId  = getState().idStore.houseId||houseId_session
    request.get(config.api.base + config.api.smartHostControl,{token:token,houseId:houseId,deviceType:deviceType,wayId:wayId,actionType:key,brightness:brightness})
    .then(res => {
      console.log(res)
    })
  };
}

export function changeRange(name,precent){
  return (dispatch,getState)=>{
    let way = '';
    if(name=='curtain'){
      way = getState().reducers.CurtainReducer.curtainWayid;
    }
    if(name=='chuangsha'){
      way = getState().reducers.CurtainReducer.chhuangshaWayid;
    }
   
  };
}

function initialState(data){
  return {
    type:'INITIALSTATE',
    data:data
  };
}
