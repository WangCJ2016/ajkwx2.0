import { request, config } from '../utlis'
import { hashHistory } from 'react-router'
import { Toast } from 'antd-mobile'

const customerId_session = sessionStorage.getItem('customerId')

export function initialState() {
  return (dispatch, getState) => {
    const customerId = getState().idStore.customerId || customerId_session
    request.get(config.api.base + config.api.queryHotelHouses ,{customerId: customerId})
      .then(res => {
        console.log(res)
        if (res && res.dataObject) {
          let rooms = []
          for(const i in res.dataObject) {
            //console.log(res.dataObject[i])
            rooms = [...rooms, ...res.dataObject[i]] 
          }
          //console.log(rooms)
          dispatch(initial(rooms))
        }
      })
  }
}

function initial(rooms) {
  return {
    type: 'INTIAL',
    rooms: rooms
  }
}

export function whetherCanOperate(houseName, houseId, id, type, floor) {

  //console.log(houseName, houseId, id, type)
  let roomsType = ''
  if (type === 'recordId') {
    roomsType = 'offline'  
  }
  if (type === 'subOrderCode') {
    roomsType = 'online'  
  }
  return () => {
    hashHistory.push(`/home?name=${houseName}&houseId=${houseId}&floor=${floor}`)
    // request.get(config.api.base + config.api.whetherCanOperate ,{type: roomsType, [type]: id})
    // .then((res) => {
    //   console.log(res)
    //   if (res.success) {
    //     hashHistory.push(`/home?name=${houseName}&houseId=${houseId}`)
    //   } else {
    //     Toast.info(res.msg, 2);
    //   }
    // })
  }

}
