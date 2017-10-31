import { request, config } from '../utlis'

const houseId = sessionStorage.getItem('houseId')
const token = sessionStorage.getItem('token')

const deviceType = 'SWITCH';

export function initailState(){
  return function(dispatch,getState){
    
     request.get(config.api.base + config.api.querySmartDeviceWays, { houseId: houseId, token: token, deviceType: 'SWITCH' })
            .then(res => {
                //console.log(res)
                let lights = []
                lights = res.dataObject.ways.filter(function(light) {
                    return light.name.indexOf('请勿打扰') > -1 ||light.name.indexOf("请即清理") > -1
                })
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
