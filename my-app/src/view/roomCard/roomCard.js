import React from 'react'

import styles from './roomCard.css'

class RoomCard extends React.Component {
  render(){
    return(
      <div className={styles.roomCard_bg}>
        <div className={styles.location}>
          <img className={styles.location_img} src={require('../../assets/imgs/roomCard/location.png')} alt=""/>
          <span className={styles.location_title}>中国，杭州市</span>
        </div>
        <div className={styles.round_bg}>
          <figure className={styles.figure_source}>
            <img src={require('../../assets/imgs/roomCard/source.png')} alt="" className={styles.icon_source}/>
            <figcaptin className={styles.selectTitle}>电源</figcaptin>
          </figure>
          <figure className={styles.figure_elevator}>
            <img src={require('../../assets/imgs/roomCard/elevator.png')} alt="" className={styles.icon_elevator}/>
            <figcaptin className={styles.selectTitle}>电源</figcaptin>
          </figure>
          <figure className={styles.figure_door}> 
            <img src={require('../../assets/imgs/roomCard/door.png')} alt="" className={styles.icon_door}/>
            <figcaptin className={styles.selectTitle}>电源</figcaptin>
          </figure>
          <div className={styles.center}>
            <p className={styles.center_name}>大床房</p>
            <p className={styles.center_num}>601</p>
          </div>
          <img src={require('../../assets/imgs/roomCard/pots.png')} className={styles.pots_top} alt=""/>

        </div>
      </div>
    )
  }
}

export default RoomCard