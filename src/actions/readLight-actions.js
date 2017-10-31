import { request, config } from '../utlis'


const houseId = sessionStorage.getItem('houseId')
const token = sessionStorage.getItem('token')

export function getInitialState() {
  return (dispatch, getStore) => {
    request.get(config.api.base + config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: 'DIMMER' })
      .then(res => {
        console.log(res)
        if (res && res.success && res.dataObject.devices.length > 0) {
          const wayIds = res.dataObject.devices[0].ways.reduce((previousValue, currentValue) => {
            if (currentValue.name.indexOf('白光') > -1) {
              return { ...previousValue, baiguangWayid: currentValue.wayId }
            }
            if (currentValue.name.indexOf('暖') > -1) {
              return { ...previousValue, nuanguangWayid: currentValue.wayId }
            }
            return { ...previousValue, otherWayid: currentValue.wayId }
          }, {})
          dispatch(initialState(wayIds))
        }
      })
  }
}

export function initialState(wayIds) {
  return {
    type: 'INITALSTATE',
    wayIds: wayIds
  }
}

export function rangeChange(value, wayId) {
  return (dispatch, getStore) => {
   
    request.get(config.api.base + config.api.smartHostControl, {
        houseId: houseId,
        deviceType: 'SWITCH',
        token: token,
        actionType : 'OPEN',
        wayId : wayId,
        brightness : value
      })
      .then(res => {
        console.log(res)
      })
  }
}

export function changeState(key, value) {
  return {
    type: 'CHANGESTATE',
    key: key,
    value: value
  }
}
export function switchClick(actionType) {
  return (dispatch, getStore) => {
    const wayIds = getStore().toObject().readLightStore.wayIds
    Promise.all([runAsync(wayIds.baiguangWayid), runAsync(wayIds.nuanguangWayid)])
    .then(res => {
      dispatch(changeState('status', actionType))
    })

    function runAsync(wayId){
      setTimeout(function() {
        request.get(config.api.base + config.api.smartHostControl, {
        houseId: houseId,
        deviceType: 'SWITCH',
        token: token,
        actionType : actionType,
        wayId : wayId,
        brightness : 50
      })
        .then(res => {
          return true
        })
      },2000)
 }
  }
  
}


