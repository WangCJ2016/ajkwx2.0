import React,{ Component } from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'

import styles  from './login.css'
import Checkbox from '../../components/checkbox/checkbox'
import * as actions from '../../actions/login-actions'


@connect(
  state => ({loginState:state.loginStore,idStore:state.idStore}),
  dispatch => ({
    loginActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Login extends Component {
  constructor(){
    super();
    this.getLoginCode = this.getLoginCode.bind(this)
    this.login = this.login.bind(this)
    this.checkboxChange = this.checkboxChange.bind(this)
  }

  handleChange(name,e){
    this.props.loginActions.changeUserAndPassword(name,e.target.value)
  }
  //获取密码
  getLoginCode(){
    const {userName} = this.props.loginState;
    if (!userName) {
      Toast.info('手机号码不能为空',2)
      return
    }
    if (!(/^1[34578]\d{9}$/.test(userName))) {
      Toast.info('请输入正确的手机号',2);
      return;
    }
   this.props.loginActions.getLoginCode(userName)

  }
  //登录
  login(){
    const {userName,password,isRemenber} = this.props.loginState;
    if (!userName) {
      Toast.info('手机号码不能为空',2);
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(userName))) {
      Toast.info('请输入正确的手机号',2);
      return;
    }
    if(!password){
      Toast.info('密码不能为空',2);
      return;
    }
    if(!(/[\d+]{6}/.test(password))){
      Toast.info('请输入正确密码',2);
      return;
    }
    this.props.loginActions.goHome(userName,password,isRemenber);
  }
  //是否记住密码
  checkboxChange(){
    const {isRemenber} = this.props.loginState;
    this.props.loginActions.changeRemember(!isRemenber);
  }
  render() {
    const {userName,password,isRemenber} = this.props.loginState;
    return (
      <div styleName='logo_bg'>
        <div styleName="ajk_logo">
          <div styleName="logo_wrap">
            <img src={require('../../assets/imgs/login/logo.png')} alt=""/>
          </div>
          <img src={require('../../assets/imgs/login/ajk_logo_title.png')} alt='' styleName="logo_title"/>
        </div>
        <div styleName="login_form">
          <form action="">
            <p styleName="form_group">
              <label><img src={require('../../assets/imgs/login/username.png')} alt=""/></label>
              <input type="tel" maxLength='11'  value={userName} placeholder='请输入手机号' onChange={this.handleChange.bind(this,'userName')}/>
            </p>
            <p styleName="form_group">
              <label><img src={require('../../assets/imgs/login/lock.png')} alt=""/></label>
              <input type="password"  maxLength='6' value={password} placeholder='请输入密码' onChange={this.handleChange.bind(this,'password')}/>
            </p>
            <div styleName="password_control">
              <div styleName='checkbox'> 
                <Checkbox checked={isRemenber} onchange={this.checkboxChange.bind(this)}/>
                <span>记住密码</span>
              </div>
              <p styleName='getPassword' onClick={this.getLoginCode.bind(this)}>获取密码</p>
            </div>
            <a styleName='submit_button'  onClick={this.login}>登录</a>
          </form>
        </div>
      </div>
   )
  }
}

export default Login