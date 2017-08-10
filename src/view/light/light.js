import React,{ Component } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './light.css'
import * as actions from '../../actions/light-actions'
import MiddleRound from './middle-round'
import LargeRound from './large-round'

@connect(
  state => ({lightStore:state.lightStore}),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Light extends Component {
  state = {
    modelActiveIndex:-1
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
  modelClick(index){
    console.log(this.state.modelActiveIndex,index)
    if(this.state.modelActiveIndex === index){
      this.setState({
      modelActiveIndex:-1
    })
    }else{
      this.setState({
      modelActiveIndex:index
    })
    }
     console.log(this.state.modelActiveIndex)
     let scene
     if(index === 0 && this.state.modelActiveIndex !== 0){
        scene=this.props.lightStore.models.filter(model => model.name === 'ledon')
     }
     if(index === 0 && this.state.modelActiveIndex === 0){
        scene=this.props.lightStore.models.filter(model => model.name === 'ledoff')
      }
    if(index === 1 && this.state.modelActiveIndex !== 1){
      scene=this.props.lightStore.models.filter(model => model.name === 'homeon')
    }
    if(index === 1 && this.state.modelActiveIndex === 1){
        scene=this.props.lightStore.models.filter(model => model.name === 'homeoff')
    }
    console.log(scene)
    this.props.lightActions.modelsClick(scene[0].sceneId);
  }

  render() {
    const {lights} = this.props.lightStore
    const {initialLights,lightsClick} = this.props.lightActions
    return (
      <div styleName='light_bg' >
        <div styleName="light_model">
          {this.modellightRender()}
        </div>
        <div styleName="round">
          <LargeRound lights={lights} initialLights={initialLights} lightsClick={lightsClick}/>
          <MiddleRound />
          <img styleName="small_round"  src={require('../../assets/imgs/light/small_round.png')} alt=''/>
        </div>
      </div>
   )
  }
}

export default Light