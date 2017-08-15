import React from 'react'
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './models.css'
import * as modelActions from '../../actions/model-actions'

@connect(
  state => ({modelState:state.modelStore}),
  dispatch => ({
    modelActions: bindActionCreators(modelActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
 class Models extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      model_activeIndex:0
    }
    this.changeModel = this.changeModel.bind(this)
  }
  componentDidMount(){
    this.props.modelActions.initialModel()
  }
  changeModel(index,keyword){
    this.setState({
      model_activeIndex:index
    })
    const scenceId = this.props.modelState.models.filter(model => model.name === keyword)[0].sceneId
    this.props.modelActions.changeModel(scenceId)
  }
  modelRender(){
    const modelArray = [{name:'getup',title:'起床',keyword:'morning'},{name:'sleep',title:'睡眠',keyword:'sleep'},{name:'reading',title:'阅读',keyword:'read'},{name:'checkout',title:'外出',keyword:"checkout"},{name:'movie',title:'影视',keyword:"movie"},{name:'meeting',title:'会客',keyword:"meeting"}]
    return modelArray.map((model,index) => {
           const stylename = classNames({
            img_wrap:true,
            [model.name]:true,
            active:index === this.state.model_activeIndex
           })

            return( 
              <figure styleName='figure' key={model.name} onClick={this.changeModel.bind(this,index,model.keyword)}>
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
    console.log(this.props)
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