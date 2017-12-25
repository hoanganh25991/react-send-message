import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"

const _ = console.log

export default class CustomerInfo extends PureComponent {
  selectUser = userId => () => {
    const {selectUser} = this.props
    if(!selectUser) return _("[selectUser] No inject callback")
    selectUser(userId)
  }

  render(){
    const {userInfo: {id, first_name, last_name, profile_pic, gender}} = this.props
    return (
      <div style={s.rootDiv} onClick={this.selectUser(id)}>
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
