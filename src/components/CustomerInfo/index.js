import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"

export default class CustomerInfo extends PureComponent {
  render(){
    const {userInfo: {first_name, last_name, profile_pic, gender}} = this.props
    return (
      <div style={s.rootDiv}>
        <div style={s.imgDiv}>
          <img src={profile_pic} style={s.imgS} alt={"avatar"}/>
        </div>
        <div style={s.infoDiv}>
          <div>{first_name} {last_name}</div>
          <div style={s.subInfoDiv}>{gender}</div>
        </div>
      </div>
    )
  }
}
