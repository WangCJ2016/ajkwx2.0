import { request, config } from '../utlis'

const customerId_session = sessionStorage.getItem('customerId')

export function initialState() {
  return (dispatch, getState) => {
    const customerId = getState().idStore.customerId || customerId_session
    request.get(config.api.base + config.api.queryHotelHouses ,{customerId: customerId})
      .then(res => {
        //console.log(res)
        if (res && res.dataObject) {
          dispatch(initial(res.dataObject))
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

