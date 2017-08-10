import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './tv.css'
import TvButton from './TvButton'

@CSSModules(styles, { allowMultiple: true })
class Tv extends React.Component {
  numRender(e){
    console.log(e.target.getAttribute('data-key'))
  }
  render(){
    return (
      <div styleName='tv_bg'>
        <div styleName="tvBox">
          <TvButton classType='tv_on'/>
          <TvButton classType='plus_off'/>
          <TvButton classType='minus_off'/>
        </div>
        <div styleName="tvBox">
          <TvButton classType='tv_on'/>
          <TvButton classType='mute_off'/>
          <TvButton classType='return_off'/>
        </div>
        <div styleName="dir_control">
          <div styleName="channel_voice">
            <span styleName="arr_up"></span>
            <span styleName="arr_title">频道</span>
            <span styleName="arr_down"></span>
          </div>
          <div styleName="arr_round" onClick={this.numRender.bind(this)}>
            <span styleName="round_up" data-key='up'></span>
            <span styleName="round_down"></span>
            <span styleName="round_left"></span>
            <span styleName="round_right"></span>
            <div styleName="arr_center">
              <div styleName="arr_ok">
                ok
              </div>
            </div>
          </div>
          <div styleName="channel_voice">
            <span styleName="arr_up"></span>
            <span styleName="arr_title">音量</span>
            <span styleName="arr_down"></span>
          </div>
        </div>
        <div styleName="review_tv">
          <p styleName="review_btn">点播</p>
          <p styleName="review_btn">回看</p>
        </div>
        <div styleName="tv_num">
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

export default Tv