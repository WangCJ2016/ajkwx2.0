import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './tv.css'
import * as tvActions from '../../actions/tv-actions'
import SlidePot from '../../components/slidePot/slide-pot'
import TvOne from './tv-one'

@connect(
  state => ({tvState:state.tvStore}),
  dispatch => ({
    tvActions: bindActionCreators(tvActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Tv extends React.Component {
  state={
    translateX:0,
    transitionType:'',
    translateIndex:0
  }
  pageX=0
  winWidth = 0
  componentDidMount(){
    this.props.tvActions.initialTv()
    this.winWidth = window.innerWidth
  }
  touchstart(e){
    this.pageX = e.changedTouches[0].pageX
    this.setState({transitionType:''})
  }
  touchmove(e){
    const maxWith = -this.winWidth*(this.props.tvState.tvs.length-1)
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
  touchend(){
    const translateX = this.state.translateX
    const translateIndex =  Math.round(translateX/this.winWidth)
    this.setState({
      translateIndex:translateIndex,
      translateX:this.winWidth*translateIndex,
      transitionType:'transform 0.5s ease-in'
    })
  }
  render(){
    console.log(this.props.tvState.tvs)
    const { tvs } = this.props.tvState
    const {translateX,transitionType,translateIndex } = this.state
    const wrapWidth = tvs.length*100 + '%'
    const tvWidth = 1/tvs.length *100 + '%'
    return (
      <div styleName='tv_bg'>
        <SlidePot num={tvs.length} activeIndex={-translateIndex} />
        <div styleName="tvwrap" style={{width:wrapWidth,transform:`translateX(${translateX}px)`,transition:transitionType}} 
        onTouchStart={this.touchstart.bind(this)} 
        onTouchMove={this.touchmove.bind(this)} 
        onTouchEnd={this.touchend.bind(this)}>
          {
            tvs.length?tvs.map((tv,index) => <TvOne width={tvWidth} tv={tv} actions={this.props.tvActions} key={index}/>):null
          }
        </div>
      </div>
    )
  }
}

export default Tv