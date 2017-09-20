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
  render() {
    const { rooms } = this.props.selectHomeState
    //console.log(rooms)
    return (
      <div styleName='selecthome_bg'>
        <div styleName="rooms">
          {
            rooms.length > 0 ? rooms.map(room => (
              <Link styleName="room" key={room.id} to={`/home?name=${room.houseName}&houseId=${room.houseId}`}>
                <div styleName="img_wrap"> 
                  <img src={require('../../assets/imgs/selectHome/lock.png')} alt=""/>             
                </div>
                <p styleName='room_name'>{room.houseName}</p>
              </Link>
            )) : null
          }
         
        </div>
      </div>
    )
  }
}

export default SelectHome