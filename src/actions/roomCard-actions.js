import { Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'

import { request, config } from '../utlis'

const deviceType = 'FINGERPRINT_LOCK';
const houseId = sessionStorage.getItem('houseId')
const token = sessionStorage.getItem('token')
const customerId= sessionStorage.getItem('customerId')

export function initialState() {
  //console.log(houseId)
  return (dispatch, getState) => {
    request.get(config.api.base + config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: deviceType })
      .then(res => {
        // console.log(res)
        if (res && res.success) {
          // console.log(res)
          if (res && res.success && res.dataObject.devices.length > 0)
            dispatch(initail(res.dataObject.devices[0].deviceId))
        }
      })
  }
}

export function initail(deviceId) {
  return {
    type: 'INITIAL',
    deviceId: deviceId
  }
}
// 开门
export function openTheDoor(deviceId) {
  return (dispatch, getState) => {
    request.get(config.api.base + config.api.smartHostControl, {
        token: token,
        houseId: houseId,
        deviceType: deviceType,
        deviceId: deviceId,
        customerId: customerId
      })
      .then(res => {
        console.log(res)
        if (res && res.success) {
          Toast.info('开锁成功')
          setTimeout(() => {
            hashHistory.goBack()
            //window.history.go(-1)
            //hashHistory.push('/home')
          }, 2000)
        }
      })
  }
}
// 梯控
export function elevator(floor, hotelId) {
  return (dispatch, getState) => {
    request.get(config.api.base + config.api.queryElevatorHost, {
        token: token,
        hotelId: hotelId,
      })
      .then(res => {
        console.log(res)
        if (res.success) {
          request.get(config.api.base + config.api.smartHostControl, {
              token: token,
              deviceType: 'ELEVATOR',
              floor: floor,
              serverId: res.dataObject[0].serverId
            })
            .then(res => {
              console.log(res)
              if (res && res.success) {
                Toast.info('梯控成功')
                setTimeout(() => {
                  hashHistory.goBack()
                  //window.history.go(-1)
                  //hashHistory.push('/home')
                }, 2000)
              }
            })
        }
      })

  }
}
