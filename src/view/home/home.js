import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { Link } from 'react-router'

import styles from './home.css'

@CSSModules(styles, { allowMultiple: true })
class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      activeIndex:0
    }
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
            home_figure:true,
            [figure.name]:true,
            active:index === activeIndex
           })
      return (
        <Link to={figure.path} key={figure.name} activeClassName='active'>
          <figure styleName={stylename}  onClick={this.goDetail.bind(this,index)}>
            <img src={require(`../../assets/imgs/home/${figure.name}.png`)} alt="" />
            <figcaption>{figure.title}</figcaption>
          </figure>
       </Link>
      )
   })
  }
  goDetail(index){
    this.setState({
      activeIndex:index
    })
  }
  render(){
    console.log(this.props.location.query)
    return(
      <div styleName='home_bg'>
       {this.figuresRender()}
       <p styleName='slogan'><img src={require('../../assets/imgs/home/slogan.png')} alt=""/></p>
      </div>
    )
  }
}

export default Home