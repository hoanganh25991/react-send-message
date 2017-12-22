import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"

const _ = console.log

export default class SendMessage extends PureComponent {

  render() {
    const {page: {id: pageId, access_token: pageToken} = {}} = this.props

    return (
      <div style={s.rootDiv}>
        <h1>Send Message</h1>
        <h3>{pageId}</h3>
        <h3>{pageToken}</h3>
      </div>
    )
  }
}
