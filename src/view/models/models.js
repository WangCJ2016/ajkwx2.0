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
      model_activeIndex:-1
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
    //console.log(this.props.modelState)
    const scenceId = this.props.modelState.models.scenes.filter(model => model.name === keyword)[0].sceneId
    this.props.modelActions.changeModel(scenceId)
  }
  changeModel_type2(index, scenceId) {
    this.setState({
      model_activeIndex:index
    })
    this.props.modelActions.changeModel(scenceId)
  }
  modelRender_type1(){
    const modelArray = [{name:'getup',title:'起床',keyword:'morning'},{name:'sleep',title:'睡眠',keyword:'sleep'},{name:'reading',title:'阅读',keyword:'read'},{name:'checkout',title:'外出',keyword:"checkout"},{name:'movie',title:'影视',keyword:"movie"},{name:'meeting',title:'会客',keyword:"meeting"}]
    return modelArray.map((model,index) => {
          let stylename 
           if (index%2 === 1) {
             stylename = classNames({
            img_wrap:true,
            [model.name]:true,
            active:index === this.state.model_activeIndex,
            second: true
           })
           } else {
             stylename = classNames({
            img_wrap:true,
            [model.name]:true,
            active:index === this.state.model_activeIndex
           })
           }
            return( 
              <figure styleName='figure' key={model.name} >
                  <div styleName={stylename} onClick={this.changeModel.bind(this,index,model.keyword)}>
                    <img src={require(`../../assets/imgs/models/${model.name}.png`)} styleName='img_getup' alt=""/>
                  </div>
                  <figcaption styleName='figcaption'>
                    {model.title}
                  </figcaption>
              </figure>
              )
          })
      }
    //东方君悦模式
    modelRender_type2() {
      const { scenes } = this.props.modelState.models
      if (scenes) {
       return scenes.map((model,index) => {
         let stylename 
           if (index%2 === 1) {
             stylename = classNames({
            img_wrap:true,
            [model.name]:true,
            active:index === this.state.model_activeIndex,
            second: true
           })
           } else {
             stylename = classNames({
            img_wrap:true,
            [model.name]:true,
            active:index === this.state.model_activeIndex
           })
           }
          
            return( 
              <figure styleName='figure' key={model.id} >
                  <div styleName={stylename} onClick={this.changeModel_type2.bind(this,index,model.sceneId)}>
                    <img src={require(`../../assets/imgs/models/${model.name}.png`)} styleName='img_getup' alt=""/>
                  </div>
                  <figcaption styleName='figcaption'>
                    { model.name.indexOf('模式') > -1 ? model.name.slice(0, -2): model.name }
                  </figcaption>
              </figure>
              )
          })
      }
    }
  render(){
    console.log(this.props.modelState)
    const { type } = this.props.modelState.models
    return(
      <div styleName='models_bg'>
        <div styleName='model_item'>
          { type === 0 ? this.modelRender_type1() : this.modelRender_type2() }
        </div>
      </div>
    )
  }
}

export default Models