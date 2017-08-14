import { Toast } from 'antd-mobile'
import { encode64, config, request } from '../utlis'
import { hashHistory } from 'react-router'


export function getLoginCode(userName) {
    return function(dispatch) {
        // dispatch(getLoginCodeStart())
        request.get(config.api.base + config.api.getLoginCode, { telephone: userName })
            .then(res => {
                if (res && res.success) {
                    Toast.info('获取验证码成功', 2)
                } else {
                    Toast.info('服务器开小差了，请稍后再试', 2)
                }
            });

    };
}
export function goHome(username, password, isRemenber) {
    return function(dispatch) {
        request.get(config.api.base + config.api.login, { username: username, password: password })
            .then(res => {
                if (res.success) {
                    console.log(res)
                    hashHistory.push(`/home?name=${res.dataObject.house.name}`)
                    sessionStorage.setItem('houseId',encode64(res.dataObject.house.id.toString()))
                    sessionStorage.setItem('customerId',encode64(res.dataObject.customer.id.toString()))
                    sessionStorage.setItem('token',res.dataObject.customer.token)
                    console.log(encode64(res.dataObject.customer.id.toString()))
                    dispatch(saveTokenHouseId(res.dataObject.customer.token, encode64(res.dataObject.house.id.toString()),encode64(res.dataObject.customer.id.toString())))
                    if (isRemenber) {
                        localStorage.setItem('userName', username)
                        localStorage.setItem('password', password)
                        localStorage.setItem('isRemenber', isRemenber)
                        localStorage.setItem('deleteTime', new Date().getTime() + 7 * 24 * 3600 * 1000)
                    } else {
                        localStorage.removeItem('userName')
                        localStorage.removeItem('password')
                        localStorage.removeItem('isRemenber')
                    }
                } else {
                    Toast.info('用户名和密码不匹配', 2)
                }
            });

    };
}
export function removeLocalData() {
    localStorage.removeItem('userName')
    localStorage.removeItem('password')
    localStorage.removeItem('isRemenber')
    return {
        type: 'REMOVELOCALDATA'
    };
}


export function changeUserAndPassword(name, value) {
    return {
        type: 'CHANGEUSERANDPASSWORD',
        name: name,
        value: value
    };
}
export function changeRemember(value) {
    return {
        type: 'CHANGEREMEMBER',
        value: value
    };
}

//保存token houseid
export function saveTokenHouseId(token, houseId,customerId) {
    console.log(customerId)
    return {
        type: 'SAVE',
        token: token,
        houseId: houseId,
        customerId:customerId
    };
}