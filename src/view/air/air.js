import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './air.css'
import AirOne from './air-one'
import * as airActions from '../../actions/air-actions'
import SlidePot from '../../components/slidePot/slide-pot'

@connect(
  state => ({airState:state.airStore}),
  dispatch => ({
    airActions: bindActionCreators(airActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Air extends React.Component {
  state={
    translateX:0,
    transitionType:'',
    translateIndex:0
  }
  pageX=0
  winWidth = 0
  componentDidMount(){
    this.props.airActions.initialAirCondition()
    this.winWidth = window.innerWidth
    document.title = '空调'
  }
  touchstart(e){
    e.stopPropagation() 
    e.preventDefault()
    this.pageX = e.changedTouches[0].pageX
    this.setState({transitionType:''})
  }
  touchmove(e){
    e.stopPropagation() 
    e.preventDefault()
    const maxWith = -this.winWidth*(this.props.airState.airs.length-1)
    const currentPageX = e.changedTouches[0].pageX
    let translateX
    if(this.state.translateX + currentPageX - this.pageX<0){
      if(this.state.translateX + currentPageX - this.pageX<=maxWith){
        translateX=maxWith
      }else{
        translateX=this.state.translateX + currentPageX - this.pageX
      }
    }else{
      translateX=0
    }
    this.setState({
      translateX: translateX
    },function(){
      this.pageX = currentPageX
    })
  }
  touchend(e){
    e.stopPropagation() 
    e.preventDefault()
    const translateX = this.state.translateX
    const translateIndex =  Math.round(translateX/this.winWidth)
    this.setState({
      translateIndex:translateIndex,
      translateX:this.winWidth*translateIndex,
      transitionType:'transform 0.5s ease-in'
    })
  }
  render(){
    const {airs,deviceType} = this.props.airState
    const {translateX,transitionType,translateIndex } = this.state
    const wrapWidth = airs.length*100 + '%'
    const airWidth = 1/airs.length *100 + '%'
    console.log(this.props)
    return(
      <div styleName='air_bg'>
        <SlidePot num={airs.length} activeIndex={-translateIndex} />
        <div styleName="airwrap" style={{width:wrapWidth,transform:`translateX(${translateX}px)`,transition:transitionType}} onTouchStart={this.touchstart.bind(this)} onTouchMove={this.touchmove.bind(this)} onTouchEnd={this.touchend.bind(this)}>
        {
          airs.length?airs.map((air,index) => <AirOne width={airWidth} key={index} deviceType={deviceType} air={air} actions={this.props.airActions}/>):null
        }
        </div>
      </div>
    )
  }
}

export default Air