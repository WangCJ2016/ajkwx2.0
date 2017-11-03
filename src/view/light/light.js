import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import styles from './light.css'
import * as actions from '../../actions/light-actions'
import MiddleRound from './middle-round'
import LargeRound from './large-round'
import { request,config } from '../../utlis'

@connect(
  state => ({lightStore:state.toObject().lightStore,idStore:state.toObject().idStore}),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Light extends React.PureComponent {
  constructor(props) {
    
    super(props)
    this.state = {
    modelActiveIndex:-1,
    
    //largeRoundShouldReset: false
    } 
  }
  componentDidMount(){
    document.title = '灯'
    this.props.lightActions.initialLights()
    this.props.lightActions.yuedudeng()
    window.addEventListener("beforeunload", () => {
      this.submitLights()
    })
  }
  componentWillReceiveProps() {}
  componentWillUnmount(){
    this.submitLights()
    window.removeEventListener("beforeunload", () => {
      this.submitLights()
    })
  }

  submitLights(){
     let  onWayIds = ''
    this.props.lightStore.lights
    .filter((light) => light.status === 'ON')
    .forEach(light => {
      onWayIds = onWayIds + ',' +light.wayId
    })
     let offWayIds = ''
    this.props.lightStore.lights
    .filter((light) => light.status === 'OFF')
    .forEach(light => {
      offWayIds = offWayIds + ',' +light.wayId
    })
    //console.log(onWayIds)
    request.get(config.api.base + config.api.modifyWaysStatus,{
      onWayIds:onWayIds.slice(1),
      offWayIds:offWayIds.slice(1)
    })
    .then(res => {
      console.log(res)
    })
  }
  
  middelRoundClick(type) {
    this.props.lightActions.changeMiddleStatus(type)
  }
  

  render() {
    
    const {lights} = this.props.lightStore
    const serveId = this.props.idStore.serveId ||sessionStorage.getItem('serveId')
    const houseId =  this.props.location.query.houseId
    const {lightsClick,getLightsWays} = this.props.lightActions
    return (
      <div styleName='light_bg' >
        <div styleName="light_model">
          
        </div>
        <div styleName="round">
          <LargeRound lights={lights} houseId={houseId} serveId={serveId} getLightsWays={getLightsWays} middleType={this.props.lightStore.middleRoundStatus}  lightsClick={lightsClick} />
          <MiddleRound  middleRoundStatus={this.props.lightStore.middleRoundStatus} middleRoundClick={this.middelRoundClick.bind(this)} />
          <img styleName="small_round"  src={require('../../assets/imgs/light/small_round.png')} alt=''/>
        </div>
      </div>
   )
  }
}

export default Light