import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import Immutable from 'seamless-immutable'
import { hashHistory } from 'react-router' 

import styles from './light.css'
import {quadrant} from '../../utlis'


@CSSModules(styles, { allowMultiple: true })
class LargeRound extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    large_round_rotate:0
    }
    this.currentAngle = 0
    this.raduisX = 0
    this.raduisY = 0
  }
  
  componentDidMount(){
    console.log(this.props)
    const fontSize = window.innerWidth/7.5
    this.raduisY = fontSize * 8.98
    this.raduisX = fontSize * 5.8
    this.websocket = new WebSocket("ws://www.live-ctrl.com/aijukex/stServlet.st?serverId=" + this.props.serveId) 
    this.websocket.onmessage = (event) => {
      let lights = this.props.lights
      //console.log(event.data)
      const lightNow = event.data.split('.WAY.')
      const changelihts = lights.map(light => {
        //console.log()
        if(light.wayId === lightNow[0]) {
         return Immutable.set(light,"status",lightNow[1])
        }else {
          return light
        }
      })
      this.props.getLightsWays(changelihts)
     }
  }
  
  componentWillUnmount(){
    this.websocket.close()
  }
  touchstart(e){
    //e.stopPropagation() 
    e.preventDefault()
    const pageX = e.changedTouches[0].pageX
    const pageY = e.changedTouches[0].pageY
    const to =((pageX-this.raduisX)/(pageY-this.raduisY))
    const whichquadrant = quadrant(pageX,this.raduisX,pageY,this.raduisY)
    if (whichquadrant === 3) {
       this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    } 
    if(whichquadrant === 4){
       this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 + 180
    }
    if(whichquadrant === 2){
      this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    }
    if(whichquadrant === 1){
      this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 +180
    }
  }
  
  touchemove(e){
    //e.stopPropagation() 
    e.preventDefault()
    const pageX = e.changedTouches[0].pageX
    const pageY = e.changedTouches[0].pageY

    //判断第几象限
    const whichquadrant = quadrant(pageX,this.raduisX,pageY,this.raduisY)
    const to =((pageX-this.raduisX)/(pageY-this.raduisY))
    let moveAngle
    if (whichquadrant === 3) {
       moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    } 
    if(whichquadrant === 4){
       moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 + 180
    }
    if(whichquadrant === 2){
      moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    }
    if(whichquadrant === 1){
      moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 +180
    }
    this.setState({
      large_round_rotate:this.state.large_round_rotate + moveAngle - this.currentAngle
    },function(){
      this.currentAngle = moveAngle
    })
  }
  touchEnd(e){
    // e.stopPropagation() 
    e.preventDefault()
  }
  lightsRender(){
    const { lights } = this.props
    return lights
    .filter((light) => light.name.indexOf(this.props.middleType) > -1)
    .map((light,index) => {
      const rotate = -90 + (30*Math.round(index/2))*Math.pow(-1,index+1)
      const large_rotateZ = this.state.large_round_rotate
      const status = light.status
      const stylename = classNames({
        lights:true,
        ['lights_'+status]:true,
        [light.name+'_'+status]:true
      })
      return (
         <div styleName='light_wrap' style={{transform:`rotateZ(${rotate}deg)`}} key={light.id}>
            <div className={stylename} style={{transform:`rotateZ(${large_rotateZ-rotate}deg)`}}
            onClick={this.lightsClick.bind(this, light.wayId, status, light.name, light.deviceId)}>
              <div className="light_img"></div>
              <p>{light.name.replace(this.props.middleType, '')}</p>
            </div>
         </div>
      )
    })
  }
  lightsClick(wayId, status, name, deviceId) {
    if (name.indexOf('灯带') > -1) {
      hashHistory.push(`light/dengdai?deviceId=${deviceId}`)
      return
    }
    if (name.indexOf('阅读灯') > -1) {
      hashHistory.push(`light/readLight?deviceId=${deviceId}`)
      return
    }
    const { lights } = this.props
    lights.forEach((light, index) => {
      if (light.wayId === wayId) {
        this.props.lightsClick(wayId, status, index)
      }
    })
  }
  render(){
    const {large_round_rotate} = this.state
    const large_rotateZ = -large_round_rotate
    return(
      <div styleName="large_round" style={{transform:`rotateZ(${large_rotateZ}deg)`}} 
      onTouchStart={this.touchstart.bind(this)}
      onTouchMove={this.touchemove.bind(this)}
      onTouchEnd={this.touchEnd.bind(this)}> 
            {this.lightsRender()}
      </div>
    )
  }
}

export default LargeRound