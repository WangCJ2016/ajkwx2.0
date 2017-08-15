import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './curtain.css'
import CurtainOne from './curtain-one'
import * as curtainActions from '../../actions/curtain-actions'
import SlidePot from '../../components/slidePot/slide-pot'
import SwipeType from '../../components/swipeTypeHoc/SwipeType'

@connect(
  state => ({curtainState:state.curtainStore}),
  dispatch => ({
    curtainActions: bindActionCreators(curtainActions, dispatch),
  })
)
@SwipeType
@CSSModules(styles, { allowMultiple: true })
class Curtain extends React.PureComponent {
  count = 0 
  countActive = 0
  componentDidMount(){
    this.props.curtainActions.initialCurtain()
    this.props.componentDidMount()
    document.title = '窗'
  }
  
  render(){
    const { curtains } = this.props.curtainState
    const wrapWidth = curtains.length*100 + '%'
    const curtainWidth = 1/curtains.length *100 + '%'
    let translateX = 0
    if(this.props.state.count - this.count === 1){
      if(this.countActive<curtains.length-1){
        this.countActive = this.countActive + 1
      }else{
        this.countActive = curtains.length - 1
      }
      translateX = -this.countActive*this.props.state.winWidth
      this.count = this.props.state.count
      console.log(translateX,this.count,this.countActive)
    }
    if(this.props.state.count - this.count === -1){
      if(this.countActive>0){
        this.countActive = this.countActive - 1
      }else{
        this.countActive = 0
      }
      translateX = -this.countActive*this.props.state.winWidth
      this.count = this.props.state.count
      console.log(translateX,this.count,this.countActive)
    }
    if(this.props.state.count - this.count === 0){
      translateX = -this.countActive*this.props.state.winWidth
    }
    return(
      <div styleName='curtain_bg'>
         <SlidePot num={curtains.length} activeIndex={this.countActive} />
         <div styleName="curtainwrap " style={{width:wrapWidth,transform:`translateX(${translateX}px)`}} 
             onTouchStart={this.props.touchstart} onTouchMove={this.props.touchmove} onTouchEnd={this.props.touchend} onTouchCancel={this.props.touchcancel}>
           {
            curtains?curtains.map((curtain,index) => <CurtainOne width={curtainWidth} curtain={curtain} actions={this.props.curtainActions} key={index}/>):null
          }
         </div>
      </div>
    )
  }
}

export default Curtain