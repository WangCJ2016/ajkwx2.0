import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './tv.css'
import * as tvActions from '../../actions/tv-actions'
import SlidePot from '../../components/slidePot/slide-pot'
import TvOne from './tv-one'
import SwipeType from '../../components/swipeTypeHoc/SwipeType'

@connect(
  state => ({tvState:state.tvStore}),
  dispatch => ({
    tvActions: bindActionCreators(tvActions, dispatch),
  })
)
@SwipeType
@CSSModules(styles, { allowMultiple: true })
class Tv extends React.PureComponent {
  constructor() {
    super()
    this.count = 0 
    this.countActive = 0
  }
  componentDidMount(){
    const houseId = this.props.location.query.houseId
    this.props.tvActions.initialTv(houseId)
    this.props.componentDidMount()
    const { tvs } = this.props.tvState
    if (tvs.length > 0) {
      document.title = Object.keys(tvs[this.countActive])[0].replace(/[0-9$]/g, '')
    }
  }
  componentDidUpdate() {
    const { tvs } = this.props.tvState
    if (tvs.length > 0) {
      document.title = Object.keys(tvs[this.countActive])[0].replace(/[0-9$]/g, '')
      //console.log(tvs)
    }
    //document.title = 
  }
  render(){
    const { tvs } = this.props.tvState
    const wrapWidth = tvs.length*100 + '%'
    const tvWidth = 1/tvs.length *100 + '%'
    let translateX = 0
    if(this.props.state.count - this.count === 1){
      if(this.countActive<tvs.length-1){
        this.countActive = this.countActive + 1
      }else{
        this.countActive = tvs.length - 1
      }
      translateX = -this.countActive*this.props.state.winWidth
      this.count = this.props.state.count
      //console.log(translateX,this.count,this.countActive)
    }
    if(this.props.state.count - this.count === -1){
      if(this.countActive>0){
        this.countActive = this.countActive - 1
      }else{
        this.countActive = 0
      }
      translateX = -this.countActive*this.props.state.winWidth
      this.count = this.props.state.count
    }
    if(this.props.state.count - this.count === 0){
      translateX = -this.countActive*this.props.state.winWidth
    }
    //console.log(this.countActive)
    return (
      <div styleName='tv_bg'>
        <SlidePot num={tvs.length} activeIndex={this.countActive} />
        <div styleName="tvwrap" style={{width:wrapWidth,transform:`translateX(${translateX}px)`}} 
        onTouchStart={this.props.touchstart} onTouchMove={this.props.touchmove} onTouchEnd={this.props.touchend} onTouchCancel={this.props.touchcancel}>
          {
            tvs.length?tvs.map((tv,index) => <TvOne width={tvWidth} tv={tv} actions={this.props.tvActions} key={index}/>):null
          }
        </div>
      </div>
    )
  }
}

export default Tv