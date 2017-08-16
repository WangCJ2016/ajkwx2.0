import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { hashHistory } from 'react-router'

import styles from './home.css'

@CSSModules(styles, { allowMultiple: true })
class Home extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      activeIndex:0
    }
  }
  componentDidMount(){
    document.title = ' '
    this.timer = setInterval(() => {
      const activeIndex = this.state.activeIndex+1
      this.setState({
        activeIndex:activeIndex%7
      })
    },3900)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
    //clearTimeout(this.timer2)
  }
  figuresRender(){
    const activeIndex = this.state.activeIndex
    const figures = [
    {name:'curtain',title:'窗帘',path:'curtain'},
    {name:'lock',title:'门锁',path:`lock?name=${this.props.location.query.name}`},
    {name:'light',title:'灯',path:'light'},
    {name:'tv',title:'电视',path:'tv'},
    {name:'service',title:'服务',path:'service'},
    {name:'air',title:'空调',path:'air'},
    {name:'model',title:'情景',path:'model'},
   ]
   return figures.map((figure,index) => {
      const stylename = classNames({
            [figure.name]:true,
            home_figure:true,
            active:index === activeIndex
           })
      return (
        // <Link to={figure.path} key={figure.name} activeClassName='active'>
          <figure styleName={stylename} key={figure.name}  onTouchEnd={this.goDetail.bind(this,index,figure.path)}>
            <img src={require(`../../assets/imgs/home/${figure.name}.png`)} alt="" />
            <figcaption>{figure.title}</figcaption>
          </figure>
       // </Link>
      )
   })
  }
  goDetail(index,path){
    this.setState({
      activeIndex:index
    })
    // this.timer2 = setTimeout(() => {
      hashHistory.push(path)
     // },200)
    //hashHistory.push(path)
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