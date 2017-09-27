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
  state => ({lightStore:state.lightStore,idStore:state.idStore}),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Light extends React.PureComponent {
  constructor() {
    super()
    this.state = {
    modelActiveIndex:-1,
    middleState: '卧室',
    //largeRoundShouldReset: false
    } 
  }
  componentDidMount(){
    document.title = '灯'
    this.props.lightActions.initialLights()
    window.addEventListener("beforeunload", () => {
      this.submitLights()
    })
  }
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
  modellightRender(){
    const modellight = ['卧室','房间']
    return modellight.map((model,index) => {
      const key = index === this.state.modelActiveIndex ? 'on':'off'
      const keyname = index === this.state.modelActiveIndex ? '全关':'全开'
      return (
          <figure styleName="light_figure" key={model} onClick={this.modelClick.bind(this,index)}>
            <img src={require(`../../assets/imgs/light/light_${key}.png`)} alt=""/>
            <figcaption>
              {model + keyname}
            </figcaption>
          </figure>
        )
    })
  }
  middelRoundClick(type) {
    this.setState({
      middleState: type,
      //largeRoundShouldReset: true
    })
  }
  modelClick(index){
    if(this.state.modelActiveIndex === index){
      this.setState({
      modelActiveIndex:-1
    })
    }else{
      this.setState({
      modelActiveIndex:index
    })
    }
     let scene
     if(index === 0 && this.state.modelActiveIndex !== 0){
        scene=this.props.lightStore.models.scenes.filter(model => model.name === 'ledon')
     }
     if(index === 0 && this.state.modelActiveIndex === 0){
        scene=this.props.lightStore.models.scenes.filter(model => model.name === 'ledoff')
      }
    if(index === 1 && this.state.modelActiveIndex !== 1){
      scene=this.props.lightStore.models.scenes.filter(model => model.name === 'homeon')
    }
    if(index === 1 && this.state.modelActiveIndex === 1){
        scene=this.props.lightStore.models.scenes.filter(model => model.name === 'homeoff')
    }
    this.props.lightActions.modelsClick(scene[0].sceneId);
  }

  render() {
    const {lights} = this.props.lightStore
    const serveId = this.props.idStore.serveId ||sessionStorage.getItem('serveId')
    const {lightsClick,getLightsWays} = this.props.lightActions
    return (
      <div styleName='light_bg' >
        <div styleName="light_model">
          {this.modellightRender()}
        </div>
        <div styleName="round">
          <LargeRound lights={lights} serveId={serveId} getLightsWays={getLightsWays} middleType={this.state.middleState}  lightsClick={lightsClick} />
          <MiddleRound middleRoundClick={this.middelRoundClick.bind(this)} />
          <img styleName="small_round"  src={require('../../assets/imgs/light/small_round.png')} alt=''/>
        </div>
      </div>
   )
  }
}

export default Light