import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
  doorSwtich(){
    this.props.roomCardActions.openTheDoor(this.props.roomCardState.deviceId)
  }
  componentDidMount(){
    this.props.roomCardActions.initialState()
    document.title = '房卡'
  }
  render(){
    const roomName = this.props.location.query.name
    return(
      <div styleName='roomCard_bg'>
        
        <div styleName='round_bg'>
          <figure styleName='figure_source'>
            <div styleName="icon_div_source"></div>
            <figcaptin styleName='selectTitle'>电源</figcaptin>
          </figure>
          <figure styleName='figure_elevator'>
            <div styleName="icon_div_elevator"></div>
            <figcaptin styleName='selectTitle'>电梯</figcaptin>
          </figure>
          <figure styleName='figure_door' onClick={this.doorSwtich.bind(this)}> 
            <div styleName="icon_div_door"></div>
            <figcaptin styleName='selectTitle'>门</figcaptin>
          </figure>
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