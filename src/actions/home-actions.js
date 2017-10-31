import {request, config ,encode64 } from '../utlis'
const token_session = sessionStorage.getItem('token')

export function initialState(houseId) {
  return (dispatch, getState) => {
    console.log(token_session)
    const token =  token_session
    request.get(config.api.base + config.api.querySmartDeviceWays, 
         { houseId: encode64(houseId),
          token: token,
          deviceType: 'SWITCH' 
      })
      .then(res => {
        if(res&&res.success){
        sessionStorage.setItem('serveId',res.dataObject.serverId)
        dispatch(saveserverId(res.dataObject.serverId))
     }
    })
  }
}
export function saveHouseId(houseId) {
  sessionStorage.setItem('houseId', encode64(houseId))
  return {
    type: 'SAVEHOUSEID',
    houseId: encode64(houseId)
  }
}

export function saveserverId(id) {
    return {
        type: 'SERVERID',
        data:id
    };
}