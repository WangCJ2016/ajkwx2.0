import React from 'react';
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReadLightRange from './components/readLight-range/readLightRange'
import styles from './readLight.css'

@CSSModules(styles, { allowMultiple: true })
export default class ReadLight extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName='readLight_wrap'>
        <div styleName="switch">
          <span styleName="switch_label">打开灯光</span>
          <img styleName="switch_img" src={require('../../assets/imgs/light/readLight_on.png')} alt=""/>
        </div>
        <div styleName="switch">
          <span styleName="switch_label">白光</span>
          <ReadLightRange />
        </div>
         <div styleName="switch">
          <span styleName="switch_label">暖光</span>
          <ReadLightRange />
        </div>
      </div>
    );
  }
}
