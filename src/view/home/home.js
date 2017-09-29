import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

import styles from './home.css'
import * as homeActions from '../../actions/home-actions'

@connect(
  state => ({idState:state.idStore}),
  dispatch => ({
    homeActions: bindActionCreators(homeActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Home extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      activeIndex:0
    }
  }
  componentDidMount(){
    document.title = this.props.location.query.name
    this.timer = setInterval(() => {
      const activeIndex = this.state.activeIndex+1
      this.setState({
        activeIndex:activeIndex%7
      })
    },3900)
    this.props.homeActions.initialState(this.props.location.query.houseId)
    this.props.homeActions.saveHouseId(this.props.location.query.houseId)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
    //clearTimeout(this.timer2)
  }
  figuresRender(){
    const activeIndex = this.state.activeIndex
    const figures = [
    {name:'curtain',title:'窗帘',path:`curtain?houseId=${this.props.location.query.houseId}`},
    {name:'lock',title:'门锁',path:`lock?name=${this.props.location.query.name}&houseId=${this.props.location.query.houseId}&floor=${this.props.location.query.floor}`},
    {name:'light',title:'灯',path:`light??houseId=${this.props.location.query.houseId}`},
    {name:'tv',title:'电视',path:`tv?houseId=${this.props.location.query.houseId}`},
    {name:'service',title:'服务',path:`service?houseId=${this.props.location.query.houseId}`},
    {name:'air',title:'空调',path:`air?houseId=${this.props.location.query.houseId}`},
    {name:'model',title:'情景',path:`model?houseId=${this.props.location.query.houseId}`},
   ]
   return figures.map((figure,index) => {
      const stylename = classNames({
            [figure.name]:true,
            home_figure:true,
            active:index === activeIndex
           })
      return (
        <Link to={figure.path} key={figure.name} activeClassName='active'>
          <figure styleName={stylename} key={figure.name}  onClick={this.goDetail.bind(this,index,figure.path)}>
            <img src={require(`../../assets/imgs/home/${figure.name}.png`)} alt="" />
            <figcaption>{figure.title}</figcaption>
          </figure>
        </Link>
      )
   })
  }
  goDetail(index,path){
    this.setState({
      activeIndex:index
    })
  }
  render(){
    return(
      <div styleName='home_bg'>
       {this.figuresRender()}
       <p styleName='slogan'><img src={require('../../assets/imgs/home/slogan.png')} alt=""/></p>
      </div>
    )
  }
}

export default Home