import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './curtain.css'
import InputRange from '../../components/inputRange/inputRange'

@CSSModules(styles, { allowMultiple: true })
class CurtainOne extends React.PureComponent {
  curtainCtrl(wayId,key){
    this.props.actions.changeCurtainStatus(wayId,key,100)
  }
  rangeChange(wayId,e){
    this.props.actions.changeCurtainStatus(wayId,'OPEN',e.target.value)
  }
  touchStart(e){
    e.stopPropagation() 
    e.preventDefault()
  }
  touchMove(e){
    e.stopPropagation() 
    e.preventDefault()
  }
  btnRender(){

  }
  render(){
    //console.log(this.props)
    const { ways } = this.props.curtain
    return(
      <div styleName="curtain_wrap" style={{width:this.props.width}}>
          {
            ways?ways.map(way => {
              return (
                <div key={way.id}>
                   <p styleName="curtain_name">{way.name}</p>
                   <div styleName="curtain_group">
                    <p styleName="curtain_btn" onClick={this.curtainCtrl.bind(this,way.wayId,'OPEN')}>打开</p>
                    <p styleName="curtain_btn" onClick={this.curtainCtrl.bind(this,way.wayId,'STOP')}>停止</p>
                    <p styleName="curtain_btn" onClick={this.curtainCtrl.bind(this,way.wayId,'CLOSE')}>关闭</p>
                  </div>
                  <InputRange touchStart={this.touchStart.bind(this)} touchMove={this.touchMove.bind(this)} touchEnd={this.rangeChange.bind(this,way.wayId)}/>       
                </div>
              )
            }):null
          }
      </div>
    )
  }
}

export default CurtainOne