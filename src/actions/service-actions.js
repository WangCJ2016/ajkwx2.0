import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

const deviceType = 'SWITCH';

export function initailState(){
  return function(dispatch,getState){
    const token  = getState().idStore.token||token_session
    const houseId  = getState().idStore.houseId||houseId_session
     request.get(config.api.base + config.api.querySmartDeviceWays, { houseId: houseId, token: token, deviceType: 'SWITCH' })
            .then(res => {
                console.log(res)
                let lights = []
                lights = res.dataObject.filter(function(light) {
                    return light.name.indexOf('请勿打扰') > -1 ||light.name.indexOf("请即清理") > -1
                })
                console.log(lights)
                dispatch(setWayId(lights))
            })
  }
}

function setWayId(lights){
  return {
    type:'SETWAY',
    lights:lights
  };
}

export function submitService(wayId,action){
  return function(dispatch,getState){
    console.log(wayId,action)
    const token  = getState().idStore.token||token_session
    const houseId  = getState().idStore.houseId||houseId_session
    request.get(config.api.base + config.api.smartHostControl, 
      {
        token:token,
        houseId:houseId,
        actionType:action,
        deviceType:deviceType,
        wayId:wayId,
        brightness:80
      })
    .then(res => {
      console.log(res)
    })
  };
}
