import { Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'

import { request,config, encode64 } from '../utlis'

const deviceType = 'FINGERPRINT_LOCK';
const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const customer_session = sessionStorage.getItem('customerId')

export function initialState(houseId){
  //console.log(houseId)
  return (dispatch,getState)=>{
    const token  = getState().idStore.token||token_session
    request.get(config.api.base + config.api.queryHostDeviceByType,{houseId:encode64(houseId),token:token,deviceType:deviceType})
    .then(res => {
      if(res&&res.success){
       // console.log(res)
        if(res && res.success && res.dataObject.devices.length > 0)
        dispatch(initail(res.dataObject.devices[0].deviceId))
      }
    })
  }
}

export function initail(deviceId){
  return {
    type:'INITIAL',
    deviceId:deviceId
  }
}
// 开门
export function openTheDoor(deviceId){
  return (dispatch,getState) => {
    const token  = getState().idStore.token||token_session
    const houseId  = getState().idStore.houseId||houseId_session
    const customerId = getState().idStore.customerId||customer_session
    request.get(config.api.base + config.api.smartHostControl,{
      token:token,
      houseId:houseId,
      deviceType:deviceType,
      deviceId:deviceId,
      customerId:customerId})
    .then(res => {
      console.log(res)
      if(res&&res.success){
        Toast.info('开锁成功')
        setTimeout(() => {
          hashHistory.goBack()
          //window.history.go(-1)
          //hashHistory.push('/home')
        },2000)
      }
    })
  }
}
// 梯控
export function elevator(floor){
  return (dispatch,getState) => {
    const token  = getState().idStore.token||token_session
    const houseId  = getState().idStore.houseId||houseId_session
    const customerId = getState().idStore.customerId||customer_session
    request.get(config.api.base + config.api.smartHostControl,{
      token:token,
      houseId:houseId,
      deviceType:'ELEVATOR',
      key:floor,
      customerId:customerId})
    .then(res => {
      console.log(res)
      if(res&&res.success){
        Toast.info('梯控成功')
        setTimeout(() => {
          hashHistory.goBack()
          //window.history.go(-1)
          //hashHistory.push('/home')
        },2000)
      }
    })
  }
}
