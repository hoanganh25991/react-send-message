import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"

const _ = console.log

export default class SendMessage extends PureComponent {

  render() {
    return (
      <div style={s.rootDiv}>
        <h1>Send Message</h1>
      </div>
    )
  }
}
