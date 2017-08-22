import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'

import styles from './roomCard.css'
import * as roomCardActions from '../../actions/roomCard-actions'

@connect(
  state => ({roomCardState:state.roomCardStore}),
  dispatch => ({
    roomCardActions: bindActionCreators(roomCardActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class RoomCard extends React.PureComponent {
  state = {
    actvieIndex:-1
  }
  componentDidMount(){
    this.props.roomCardActions.initialState()
    document.title = '房卡'
  }
  figureRender(){
    const { actvieIndex } = this.state
    const arrys = [{title: '电源' ,name: 'source'},{title: '门' ,name: 'door'},{title: '电梯' ,name: 'elevator'}]
    return arrys.map((arry,index) => {
      const style = classNames({
        figure:true,
        [`figure_${arry.name}`]: true,
        active:index === actvieIndex
      })
      let dsf = index !== actvieIndex ? <img src={require(`../../assets/imgs/roomCard/${arry.name}.png`)} alt=""/>:
                  <img src={require(`../../assets/imgs/roomCard/${arry.name}_active.png`)} alt=""/>
      return <div styleName={style} key={arry.name} onClick={this.click.bind(this,index,arry.name)}>
              <div>
                { dsf }            
              </div>
              <p styleName='selectTitle'>{arry.title}</p>
            </div>
    })
  }
  click(index,type) {
    this.setState({actvieIndex:index})
    if(type === 'door') {
      this.props.roomCardActions.openTheDoor(this.props.roomCardState.deviceId)
    }
  }
  render(){
    const roomName = this.props.location.query.name
    return(
      <div styleName='roomCard_bg'> 
        <div styleName='round_bg'>
          {this.figureRender()}
          <div styleName='center'>
            <p styleName='center_name'>{roomName?roomName.slice(0,-3):null}</p>
            <p styleName='center_num'>{roomName?roomName.slice(-3):null}</p>
          </div>
          <img src={require('../../assets/imgs/roomCard/pots.png')} styleName='pots_top' alt=""/>

        </div>
      </div>
    )
  }
}

export default RoomCard