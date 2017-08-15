import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
  state={
    clean:'CLOSE',
    disturb:'CLOSE'
  }
  componentDidMount(){
    document.title = '服务'
    this.props.serviceActions.initailState()
  }
  submitService(type){
    const { lights } = this.props.serviceState 
    this.setState({
      [type]:this.state[type]==='CLOSE'?'OPEN':'CLOSE'
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
    console.log(this.state)
    return (
      <div styleName='service_bg'>
        <div styleName='marignTop'></div>
        <div styleName='rect'>
          <div styleName='service_item' onClick={this.submitService.bind(this,'clean')}>
            <img src={require('../../assets/imgs/service/swape.png')} alt="" styleName='swape'/>
            <p styleName='content'>请即清理</p>
            <img src={require(`../../assets/imgs/service/click_${this.state.clean}.png`)} alt="" styleName='selectedlight'/>
          </div>
          <div styleName='service_item' onClick={this.submitService.bind(this,'disturb')}>
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