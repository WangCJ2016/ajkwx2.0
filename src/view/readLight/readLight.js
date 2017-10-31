import React from 'react';
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReadLightSwitch from './components/readLight-switch/readLightSwitch'
import ReadLightRange from './components/readLight-range/readLightRange'
import styles from './readLight.css'
import * as actions from '../../actions/readLight-actions'

@connect(
  (store) => ({readLightStore: store.toObject().readLightStore}),
  dispatch => ({readLightActions: bindActionCreators(actions, dispatch)})
)
@CSSModules(styles, { allowMultiple: true })
export default class ReadLight extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      baiguangValue: 50,
      nuanguangValue: 50,
    }
  }
  componentDidMount() {
    this.props.readLightActions.getInitialState()
  }
  switchClick() {
    if (this.props.readLightStore.status === 'CLOSE') {
      this.props.readLightActions.switchClick('OPEN')
    } else {
      this.props.readLightActions.switchClick('CLOSE')
    }
  }
  rangeChange(type, e) {
    let wayId 
    if (type === 'baiguang') {
      wayId = this.props.readLightStore.wayIds.baiguangWayid
      this.setState({
        baiguangValue: e.target.value
      })
    }
    if (type === 'nuanguang') {
      wayId = this.props.readLightStore.wayIds.nuanguangWayid
       this.setState({
        nuanguangValue: e.target.value
      })
    }
    this.props.readLightActions.rangeChange(e.target.value, wayId)
  }
  render() {
    console.log(this.props.readLightStore)
    const { status } = this.props.readLightStore
    return (
      <div styleName='readLight_wrap'>
        <div styleName='blank1'></div>
        <ReadLightSwitch status={status} clickfn={this.switchClick.bind(this)}/>
        <div styleName='blank2'></div>
        <div styleName="switch">
          <span styleName="switch_label">白光</span>
          <ReadLightRange onChangefn={this.rangeChange.bind(this, 'baiguang')} value={this.state.baiguangValue}/>
        </div>
        <div styleName='blank2'></div>
         <div styleName="switch">
          <span styleName="switch_label">暖光</span>
          <ReadLightRange onChangefn={this.rangeChange.bind(this, 'nuanguang')} value={this.state.nuanguangValue} />
        </div>
      </div>
    );
  }
}
