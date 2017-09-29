import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router'

import * as selectHomeActions from '../../actions/selectHome-actions'
import styles from './selectHome.css'

@connect(
  state => ({selectHomeState:state.selectHomeStore}),
  dispatch => ({
    selectHomeActions: bindActionCreators(selectHomeActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class SelectHome extends React.Component {
  componentDidMount() {
    this.props.selectHomeActions.initialState()
  }
  whetherCanOperate(houseName, houseId, id) {
    this.props.actions.whetherCanOperate(houseName, houseId, id)
  }
  roomRender() {
    const { rooms } = this.props.selectHomeState
   return rooms.map((room) => {
      if (room.subOrderCode) {
        return  <Link styleName="room" key={room.id}
                  onClick={this.props.selectHomeActions.whetherCanOperate.bind(this, room.houseName, room.houseId, room.subOrderCode, 'subOrderCode', room.floor)}
                   >
                     <div styleName="img_wrap"> 
                    <img src={require('../../assets/imgs/selectHome/lock.png')} alt=""/>             
                  </div>
                  <p styleName='room_name'>{room.houseName.replace(/[0-9]/ig,"")}</p>
                  <p styleName='room_name'>{room.houseName.replace(/[^0-9]/ig,"")}</p>
                </Link>
      } else {
         return  <Link styleName="room" key={room.id}
                  onClick={this.props.selectHomeActions.whetherCanOperate.bind(this, room.houseName, room.houseId, room.id, 'recordId', room.floor)}
                   >
                     <div styleName="img_wrap"> 
                    <img src={require('../../assets/imgs/selectHome/lock.png')} alt=""/>             
                  </div>
                  <p styleName='room_name'>{room.houseName.replace(/[0-9]/ig,"")}</p>
                  <p styleName='room_name'>{room.houseName.replace(/[^0-9]/ig,"")}</p>
                </Link>
      }
    })
    
    
  }
  render() {
    const { rooms } = this.props.selectHomeState
    //console.log(rooms)
    return (
      <div styleName='selecthome_bg'>
        <div styleName="rooms">
          {this.roomRender()}
         
        </div>
      </div>
    )
  }
}

export default SelectHome