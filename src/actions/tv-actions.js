import { config, request } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'VIRTUAL_TV_DVD_REMOTE';

export function initialTv() {
  return function(dispatch,getState){
    const token = getState().idStore.token || token_session
    const houseId = getState().idStore.houseId || houseId_session
    request.get(config.api.base + config.api.queryTvDevices,{houseId:houseId,token:token})
    .then(res => {
      if (res&&res.success) {
        let arry = []
        for(let i in res.dataObject){
          arry.push(res.dataObject[i])
        }
        dispatch(initialState(arry))
      }
    })
  };
}
export function tvCtrl(key,deviceId){
  return (dispatch,getState)=>{
    const token = getState().idStore.token || token_session
    const houseId = getState().idStore.houseId || houseId_session
    request.get(config.api.base + config.api.smartHostControl,{houseId:houseId,token:token,deviceType:deviceType,deviceId:deviceId,key:key})
    .then(res => {
      console.log(res)
    })
  };
}


function initialState(tv){
  return {
    type:'INITAILSTATE',
    tv:tv
  };
}
