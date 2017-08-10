import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './curtain.css'

@CSSModules(styles, { allowMultiple: true })
class Curtain extends React.Component {
  render(){
    return(
      <div styleName='curtain_bg'>
        <h3 styleName="curtain_title">窗帘/窗纱</h3>
          <div styleName="curtain_group">
            <p styleName="curtain_name">窗帘</p>
            <p styleName="curtain_btn">打开</p>
            <p styleName="curtain_btn">停止</p>
            <p styleName="curtain_btn">关闭</p>
          </div>
          <div styleName="curtain_group">
            <p styleName="curtain_name">窗纱</p>
            <p styleName="curtain_btn">打开</p>
            <p styleName="curtain_btn">停止</p>
            <p styleName="curtain_btn">关闭</p>
          </div>
        
      </div>
    )
  }
}

export default Curtain