import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

import styles from './service.css'
import * as serviceActions from '../../actions/service-actions'

@connect(
  state => ({serviceState:state.serviceStore}),
  dispatch => ({
    serviceActions: bindActionCreators(serviceActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Service extends React.PureComponent {
  constructor() {
    super()
    this.state = {
    clean:'CLOSE',
    disturb:'CLOSE'
    }
  }
  componentDidMount(){
    document.title = '服务'
    this.props.serviceActions.initailState()
  }
  submitService(type){

    const { lights } = this.props.serviceState 
    const status = this.state[type]==='CLOSE'?'OPEN':'CLOSE'
    let antherTpye = ''
    if (status === 'OPEN') {
      if (type === 'clean') {
        antherTpye = 'disturb'
      }else{
        antherTpye = 'clean'
      }
    }
    this.setState({
      [type]:status,
      [antherTpye]:'CLOSE'
    },function(){
      if (type==='clean') {
        const cleanlight = lights.filter(light => light.name === "请即清理")
        this.props.serviceActions.submitService(cleanlight[0].wayId,this.state[type])
      }
      if (type==='disturb') {
        const cleanlight = lights.filter(light => light.name === "请勿打扰")
        this.props.serviceActions.submitService(cleanlight[0].wayId,this.state[type])
      }
    })
  }

  render() {
    const cleanStyle = classNames({
      service_item:true,
      active:this.state.clean==='CLOSE'?false:true
    })
     const disturbStyle = classNames({
      service_item:true,
      active:this.state.disturb==='CLOSE'?false:true
    })
    return (
      <div styleName='service_bg'>
        <div styleName='marignTop'></div>
        <div styleName='rect'>
          <div styleName={cleanStyle} onClick={this.submitService.bind(this,'clean')}>
            <img src={require('../../assets/imgs/service/swape.png')} alt="" styleName='swape'/>
            <p styleName='content'>请即清理</p>
            <img src={require(`../../assets/imgs/service/click_${this.state.clean}.png`)} alt="" styleName='selectedlight'/>
          </div>
          <div styleName={disturbStyle} onClick={this.submitService.bind(this,'disturb')}>
            <img src={require('../../assets/imgs/service/ring.png')} alt="" styleName='ring'/>
            <p styleName='content'>请勿打扰</p>
            <img src={require(`../../assets/imgs/service/click_${this.state.disturb}.png`)} alt="" styleName='selectedlight' />
          </div>
        </div>
      </div>
    )
  }
}

export default Service