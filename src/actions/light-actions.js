import { config, request } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

export function initialLights() {
    return function(dispatch, getState) {
        const token = getState().idStore.token || token_session
        const houseId = getState().idStore.houseId || houseId_session
        request.get(config.api.base + config.api.queryHostScenes, { houseId: houseId, token: token })
            .then(res => {
                console.log(res)
                dispatch(getModelScens(res.dataObject))
            })
        //灯
        request.get(config.api.base + config.api.querySmartDeviceWays, { houseId: houseId, token: token, deviceType: 'SWITCH' })
            .then(res => {
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
    return function(dispatch, getState) {
        const token = getState().idStore.token || token_session
        const houseId = getState().idStore.houseId || houseId_session
        request.get(config.api.base + config.api.smartHostControl, {
                houseId: houseId,
                deviceType: 'SCENE',
                sceneId: sceneId,
                token: token
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
export function lightsClick(wayId, actionType, index) {
    return function(dispatch, getState) {
        const token = getState().idStore.token || token_session
        const houseId = getState().idStore.houseId || houseId_session
        request.get(config.api.base + config.api.smartHostControl, {
                houseId: houseId,
                deviceType: 'SWITCH',
                actionType: actionType,
                wayId: wayId,
                token: token,
                brightness: 80
            })
            .then((res) => {
                console.log(res)
                if (res && res.success) {
                    dispatch(changelightstatus(index, actionType))
                }
            })
    }
}
export function changelightstatus(index, type) {
    return {
        type: 'CHANGELIGHTSTATUS',
        id: index,
        status: type
    };
}