import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'

import styles from './curtain.css'
import InputRange from '../../components/inputRange/inputRange'

@CSSModules(styles, { allowMultiple: true })
class CurtainOne extends React.PureComponent {
  state = {
    chuanglianActiveIndex:-1,
    chuangshaActiveIndex:-1
  }
  curtainCtrl(wayId,key,index,type){
    this.setState({
      [type]:index
    })
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
  btnRender(way){
    let activeIndex,type
    if (way.name.indexOf('窗帘')>-1) {
      activeIndex = this.state.chuanglianActiveIndex
      type = 'chuanglianActiveIndex'
    }
    if (way.name.indexOf('窗纱')>-1) {
      activeIndex = this.state.chuangshaActiveIndex
      type = 'chuangshaActiveIndex'
    }
    const curtainBtns = [{title:'打开',type:'OPEN'},{title:'停止',type:'STOP'},{title:'关闭',type:'CLOSE'}]
    return curtainBtns.map((btn,index) => {
      const style = classNames({
        curtain_btn:true,
        active:index === activeIndex
      })
      return <p key={btn.title} styleName={style} onClick={this.curtainCtrl.bind(this,way.wayId,btn.type,index,type)}>{btn.title}</p>
    })
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
                    {this.btnRender(way)}
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