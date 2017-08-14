import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './tv.css'
import TvButton from './TvButton'

@CSSModules(styles, { allowMultiple: true })
class TvOne extends React.Component {
  state = {
    tv:'OFF',
    tvBox:'OFF'
  }
  
  numClick(e){
    console.log(e.target.getAttribute('data-key'))
    this.tvBoxCtrl(e.target.getAttribute('data-key'))
  }
  tvCtrl(key){
    let deviceId
    for(let i in this.props.tv){
      if (i.indexOf('电视机')>-1) {
        deviceId = this.props.tv[i]
      }
    }
    if (key === 'ON'||key === 'OFF') {
      this.setState({
        tv:key ==='ON'?'OFF':'ON'
      },function(){
        this.props.actions.tvCtrl(this.state.tv,deviceId)
      })
    }else{
      this.props.actions.tvCtrl(key,deviceId)
    }
  }
  tvBoxCtrl(key){
     let deviceId
    for(let i in this.props.tv){
      if (i.indexOf('机顶盒')>-1) {
        deviceId = this.props.tv[i]
      }
    }
    if (key === 'ON'||key === 'OFF') {
      this.setState({
        tvBox:key ==='ON'?'OFF':'ON'
      },function(){
        this.props.actions.tvCtrl(this.state.tvBox,deviceId)
      })
    }else{
      this.props.actions.tvCtrl(key,deviceId)
    }
  }
  render(){
    const {width} = this.props
    return (
      <div styleName="tv_wrap" style={{width:width}}>
        <div styleName="tvBox">
          <TvButton classType={`tv_${this.state.tv}`} click={this.tvCtrl.bind(this,this.state.tv)}/>
          <TvButton classType='plus_off' click={this.tvCtrl.bind(this,'VOL_PLUS')}/>
          <TvButton classType='minus_off' click={this.tvCtrl.bind(this,'VOL_SUB')}/>
        </div>
        <div styleName="tvBox">
          <TvButton classType={`tv_${this.state.tvBox}`} click={this.tvBoxCtrl.bind(this,this.state.tvBox)} />
          <TvButton classType='mute_off' click={this.tvBoxCtrl.bind(this,'MUTE')}/>
          <TvButton classType='return_off' click={this.tvBoxCtrl.bind(this,'RETURN')}/>
        </div>
        <div styleName="dir_control">
          <div styleName="channel_voice">
            <span styleName="arr_up"></span>
            <span styleName="arr_title">频道</span>
            <span styleName="arr_down"></span>
          </div>
          <div styleName="arr_round" >
            <span styleName="round_up active" data-key='up' onTouchEnd={this.tvBoxCtrl.bind(this,'UP')}>
            </span>
            <span styleName="round_down" onTouchEnd={this.tvBoxCtrl.bind(this,'DOWN')}></span>
            <span styleName="round_left" onTouchEnd={this.tvBoxCtrl.bind(this,'LEFT')}></span>
            <span styleName="round_right" onTouchEnd={this.tvBoxCtrl.bind(this,'RIGHT')}></span>
            <div styleName="arr_center">
              <div styleName="arr_ok" onTouchEnd={this.tvBoxCtrl.bind(this,'OK')}>
                ok
              </div>
            </div>
          </div>
          <div styleName="channel_voice">
            <span styleName="arr_up" onTouchEnd={this.tvBoxCtrl.bind(this,'VOL_PLUS')}></span>
            <span styleName="arr_title">音量</span>
            <span styleName="arr_down" onTouchEnd={this.tvBoxCtrl.bind(this,'VOL_SUB')}></span>
          </div>
        </div>
        <div styleName="review_tv">
          <p styleName="review_btn">点播</p>
          <p styleName="review_btn">回看</p>
        </div>
        <div styleName="tv_num" onTouchEnd={this.numClick.bind(this)}>
          <div styleName="num_item">
            <span styleName="num" data-key='1'>1</span>
            <span styleName="num" data-key='2'>2</span>
            <span styleName="num" data-key='3'>3</span>
          </div>
          <div styleName="num_item">
            <span styleName="num" data-key='4'>4</span>
            <span styleName="num" data-key='5'>5</span>
            <span styleName="num" data-key='6'>6</span>
          </div>
          <div styleName="num_item">
            <span styleName="num" data-key='7'>7</span>
            <span styleName="num" data-key='8'>8</span>
            <span styleName="num" data-key='9'>9</span>
          </div>
          <div styleName="num_item_last">
            <span styleName="num" data-key='0'>0</span>
          </div>
        </div>
      </div>
    )
  }
}

export default TvOne