import React from 'react'

import styles from './service.css'

class Service extends React.Component {
  componentDidMount(){
    document.title = '服务'
  }
  render() {
    return (
      <div className={styles.service_bg}>
        <div className={styles.marignTop}></div>
        <div className={styles.rect}>
          <div className={styles.service_item}>
            <img src={require('../../assets/imgs/service/swape.png')} alt="" className={styles.swape}/>
            <p className={styles.content}>请勿打扰</p>
            <img src={require('../../assets/imgs/service/click_on.png')} alt="" className={styles.selectedlight}/>
          </div>
          <div className={styles.service_item}>
            <img src={require('../../assets/imgs/service/ring.png')} alt="" className={styles.ring}/>
            <p className={styles.content}>请勿打扰</p>
            <img src={require('../../assets/imgs/service/click_off.png')} alt="" className={styles.unselectedlight} />
          </div>
        </div>
      </div>
    )
  }
}

export default Service