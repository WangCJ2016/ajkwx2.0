import { config,request } from '../utlis'

export function initialLights() {
    return function(dispatch) {
            request.get(config.api.base + config.api.queryHostScenes,{houseId:sessionStorage.getItem('houseId')})
            .then(res => {
                console.log(res)
                dispatch(getModelScens(res.dataObject))
            })
        //灯
        request.get(config.api.base + config.api.querySmartDeviceWays,{houseId:sessionStorage.getItem('houseId'),deviceType:'SWITCH'})
        .then(res=>{
            console.log(res)
            let lights = []
            lights = res.dataObject.filter(function(light) {
                return light.name.indexOf('灯') > -1
            })
            dispatch(getLightsWays(lights))
            console.log(lights)
        })
    }
}

export function getModelScens(data) {
    return {
        type: 'GETMODELSCENE',
        models: data
    }
}
export function getLightsWays(data) {
    return {
        type: 'GETLIGHTWAYS',
        lights: data
    }
}

export function modelsClick(sceneId) {
    return function(dispatch) {
        request.get(config.api.base + config.api.smartHostControl,
            {
            houseId:sessionStorage.getItem('houseId'),
            deviceType:'SCENE',
            sceneId:sceneId,
            token:sessionStorage.getItem('token')
            })        
            .then((res) => {
                console.log(res)
            });
    };
}
export function homeLightChangeState(type) {
    switch (type) {
        case 'homeon':
            return {
                type: 'HOMELIGHTCHANGESTATE',
                payload: 'homeon',
                unpayload: 'homeoff'
            }
        case 'homeoff':
            return {
                type: 'HOMELIGHTCHANGESTATE',
                payload: 'homeoff',
                unpayload: 'homeon'
            }
        case 'ledon':
            return {
                type: 'HOMELIGHTCHANGESTATE',
                payload: 'ledon',
                unpayload: 'ledoff'
            }
        case 'ledoff':
            return {
                type: 'HOMELIGHTCHANGESTATE',
                payload: 'ledoff',
                unpayload: 'ledon'
            }
        default:
            return
    }
}
export function lightsClick(wayId,actionType,index){
  return function(dispatch){
    request.get(config.api.base + config.api.smartHostControl,
            {
            houseId:sessionStorage.getItem('houseId'),
            deviceType:'SWITCH',
            actionType:actionType,
            wayId:wayId,
            token:sessionStorage.getItem('token'),
            brightness:80
            })        
            .then((res)=>{
                console.log(res)
                if(res&&res.success){
                    dispatch(changelightstatus(index,actionType))
                }
            })
  }
}
export function changelightstatus(index,type){
  return {
    type:'CHANGELIGHTSTATUS',
    id:index,
    status:type
  };
}
export function changeRouter(url){
  return (dispatch)=>{
   
  };
}
