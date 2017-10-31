import { config, request } from '../utlis'

const houseId = sessionStorage.getItem('houseId')
const token = sessionStorage.getItem('token')
const deviceType = 'VIRTUAL_TV_DVD_REMOTE';

export function initialTv() {
  return function(dispatch,getState){
    request.get(config.api.base + config.api.queryTvDevices,{houseId:houseId,token:token})
    .then(res => {
      //console.log(res)
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
