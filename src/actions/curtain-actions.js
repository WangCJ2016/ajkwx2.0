import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'CURTAIN'

export function initialCurtain() {
  return (dispatch,getState)=> {
    const token  = getState().idStore.token||token_session
    const houseId  = getState().idStore.houseId||houseId_session
    request.get(config.api.base + config.api.queryCurtains,{houseId:houseId,token:token,deviceType:deviceType})
    .then(res => {
     // console.log(res)
      if(res&&res.success){
        let curtainsArray = []
        for(let i in res.dataObject.curtains) {
          curtainsArray.push(res.dataObject.curtains[i])
        }
       //console.log(curtainsArray)
        dispatch(initialState(curtainsArray))
        dispatch(initialStateType(res.dataObject.type))
      }
    })
  }
}
export function changeCurtainStatus(wayId,key,brightness){
  return (dispatch,getState)=>{
    const token  = getState().idStore.token||token_session
    const houseId  = getState().idStore.houseId||houseId_session
    request.get(config.api.base + config.api.smartHostControl,{token:token,houseId:houseId,deviceType:deviceType,wayId:wayId,actionType:key,brightness:brightness})
    .then(res => {
      console.log(res)
    })
  };
}



function initialState(data){
  return {
    type:'INITIALSTATE',
    data:data
  };
}

function initialStateType(data){
  return {
    type:'INITIALSTATETYPE',
    data:data
  };
}
