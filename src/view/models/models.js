import React from 'react'
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'

import styles from './models.css'

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
 class Models extends React.Component {
  constructor(){
    super()
    this.state = {
      model_activeIndex:0
    }
    this.changeModel = this.changeModel.bind(this)
  }
  changeModel(index){
    this.setState({
      model_activeIndex:index
    })
  }
  modelRender(){
    const modelArray = [{name:'getup',title:'起床'},{name:'sleep',title:'睡眠'},{name:'reading',title:'阅读'},{name:'checkout',title:'外出'},{name:'movie',title:'影视'},{name:'meeting',title:'会客'}]
    return modelArray.map((model,index) => {
           const stylename = classNames({
            img_wrap:true,
            [model.name]:true,
            active:index === this.state.model_activeIndex
           })

            return( 
              <figure styleName='figure' key={model.name} onClick={this.changeModel.bind(this,index)}>
                  <div styleName={stylename}>
                    <img src={require(`../../assets/imgs/models/${model.name}.png`)} styleName='img_getup' alt=""/>
                  </div>
                  <figcaption styleName='figcaption'>
                    {model.title}
                  </figcaption>
              </figure>
              )
          })
         }
  render(){
    console.log(styles)
    return(
      <div styleName='models_bg'>
        <div styleName='model_item'>
          {this.modelRender()}
        </div>
      </div>
    )
  }
}

export default Models