import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

export function rgbClick(deviceId, key) {
  return (dispatch, getState) => {
    const token  = getState().idStore.token||token_session
    const houseId  = getState().idStore.houseId||houseId_session
    request.get(config.api.base + config.api.smartHostControl, 
      { 
        token: token, 
        deviceType : 'VIRTUAL_RGB_REMOTE', 
        houseId: houseId, 
        deviceId : deviceId,
        key: key.toUpperCase(),
        rgb : "*"
       })
       .then(res => {
         console.log(res)
       })
  }
}