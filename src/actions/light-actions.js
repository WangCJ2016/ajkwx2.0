import { config, request } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

export function initialLights() {
  return function(dispatch, getState) {
    const token = getState().idStore.token || token_session
    const houseId = getState().idStore.houseId || houseId_session
    request.get(config.api.base + config.api.queryHostScenes, { houseId: houseId, token: token })
      .then(res => {
        dispatch(getModelScens(res.dataObject))
      })
    //灯
    request.get(config.api.base + config.api.querySmartDeviceWays, { houseId: houseId, token: token, deviceType: 'SWITCH' })
      .then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch(getServeId(res.dataObject.serverId))
          let lights = []
          lights = res.dataObject.ways.filter(function(light) {
            return light.name.indexOf('灯') > -1
          })
          return lights
        }
      })
      .then(lights => {
        request.get(config.api.base + config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: 'VIRTUAL_RGB_REMOTE' })
          .then(res => {
            console.log(res)
            let allLight = []
            if (res && res.success && res.dataObject.devices.length > 0) {
                res.dataObject.devices[0].name = '其他可调灯带'
              allLight = [...lights, ...res.dataObject.devices]
            } else {
              allLight = lights
            }
            return allLight
          })
          .then(lights => {
            request.get(config.api.base + config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: 'DIMMER' })
              .then(res => {
                console.log(res)
                let allLight = []
                if (res && res.success && res.dataObject.devices.length > 0) {
                    res.dataObject.devices[0].name = '其他可调阅读灯'
                  allLight = [...lights, ...res.dataObject.devices]
                } else {
                  allLight = lights
                }
                dispatch(getLightsWays(allLight))
              })
          })
      })

  }
}

// 判断是否有阅读灯
export function yuedudeng() {
  return (dispatch, getState) => {
    const token = getState().idStore.token || token_session
    const houseId = getState().idStore.houseId || houseId_session
    request.get(config.api.base + config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: 'VIRTUAL_RGB_REMOTE' })
      .then(res => {
        console.log(res)
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
export function getServeId(data) {
  return {
    type: 'GETSERVEID',
    serveId: data
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

export function lightsClick(wayId, status, index) {
  const actionType = status === 'ON' ? 'CLOSE' : 'OPEN'
  const status_on = status === 'ON' ? 'OFF' : 'ON'
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
          dispatch(changelightstatus(index, status_on))
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
