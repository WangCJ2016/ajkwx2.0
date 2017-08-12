import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './curtain.css'
import CurtainOne from './curtain-one'
import * as curtainActions from '../../actions/curtain-actions'
import SlidePot from '../../components/slidePot/slide-pot'

@connect(
  state => ({curtainState:state.curtainStore}),
  dispatch => ({
    curtainActions: bindActionCreators(curtainActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Curtain extends React.Component {
  state={
    translateX:0,
    transitionType:'',
    translateIndex:0
  }
  pageX=0
  winWidth = 0
  componentDidMount(){
    this.props.curtainActions.initialCurtain()
    this.winWidth = window.innerWidth
    document.title = '窗'
  }
  touchstart(e){
    //  e.stopPropagation() 
    // e.preventDefault()
    this.pageX = e.changedTouches[0].pageX
    this.setState({transitionType:''})
  }
  touchmove(e){
    // e.stopPropagation() 
    // e.preventDefault()
    const maxWith = -this.winWidth*(this.props.curtainState.curtains.length-1)
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
    //  e.stopPropagation() 
    // e.preventDefault()
    const translateX = this.state.translateX
    const translateIndex =  Math.round(translateX/this.winWidth)
    this.setState({
      translateIndex:translateIndex,
      translateX:this.winWidth*translateIndex,
      transitionType:'transform 0.5s ease-in'
    })
  }
  render(){
    //console.log(this.props)
    const { curtains } = this.props.curtainState
    const {translateX,transitionType,translateIndex } = this.state
    const wrapWidth = curtains.length*100 + '%'
    const curtainWidth = 1/curtains.length *100 + '%'
    return(
      <div styleName='curtain_bg'>
         <div styleName="curtainwrap" style={{width:wrapWidth,transform:`translateX(${translateX}px)`,transition:transitionType}} 
          onTouchStart={this.touchstart.bind(this)} 
          onTouchMove={this.touchmove.bind(this)} 
          onTouchEnd={this.touchend.bind(this)}>
         
           {
            curtains.length?curtains.map((curtain,index) => <CurtainOne width={curtainWidth} curtain={curtain} actions={this.props.curtainActions} key={index}/>):null
          }
         </div>
      </div>
    )
  }
}

export default Curtain