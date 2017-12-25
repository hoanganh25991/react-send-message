import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"
import * as firebase from "firebase"
import CustomerInfo from "../CustomerInfo"
import {sendMsg} from "../../facebook-api/pageSendMsg";

const _ = console.log

const firebaseConfig = {
  apiKey: "AIzaSyDXbD71Y_uA8ldm1h9S2-6AOgl73UOid1U",
  authDomain: "glass-turbine-148103.firebaseapp.com",
  databaseURL: "https://glass-turbine-148103.firebaseio.com",
}

const mainBranch = "tmp/sendMessageDemo/pages"
const objBranch = "customers"

export default class SendMessage extends PureComponent {
  state = {
    msg: "",
    customers: [],
    selectedCustomers: [],
  }

  componentDidMount(){
    this.getOptInCustomers()
  }

  componentWillUnmount(){
    const {fbApp} = this.state
    if(!fbApp) return
    fbApp.close().then(() => _("[fbApp] closed")).catch(err => _("[fbApp] [ERR]", err))
  }

  getOptInCustomers = () => {
    const {page : {id: pageId}} = this.props
    if(!pageId) return
    const fbApp =firebase.initializeApp(firebaseConfig, pageId);
    const db = fbApp.database();
    this.setState({db, fbApp})

    db.ref(`${mainBranch}/${pageId}/${objBranch}`).on("value", snapshot => {
      const customers = snapshot.val()
      _(`[db] [page-${pageId}] customers`, customers)
      if(!customers) return
      this.setState({customers: Object.values(customers)})
    })
  }

  storeMsg = e => {
    const msg = e.target.value
    _("[msg]", msg)
    this.setState({msg})
  }

  toggleAddToSendList = userId => {
    const {selectedCustomers: curr} = this.state
    const filterdList = curr.filter(id => id !== userId)
    const selectedCustomers = [...filterdList, userId]
    this.setState({selectedCustomers})
  }

  broadcastMsg = () => {
    _("[broadcastMsg] Sending")
    const {selectedCustomers, msg: text} = this.state
    const {page: {id: pageId, access_token: pageToken} = {}} = this.props
    const waitSendList = selectedCustomers.map(recipientId => {
      return sendMsg({pageId, pageToken})({text, recipientId}).catch(err => {
        _("[sendMsg][ERR]Fail at recipientId:",recipientId)
        _("[sendMsg][ERR]", err)
      })
    })

    Promise.all(waitSendList).then(() => _("[broadcastMsg] Finished")).catch(err => _("[broadcastMsg][ERR]", err))
  }

  render() {
    const {page: {id: pageId, access_token: pageToken, name} = {}} = this.props
    const {customers} = this.state

    return (
      <div style={s.rootDiv}>
        <div style={s.pageName}>{name}</div>
        <div>{pageId}</div>
        <div>{pageToken}</div>
        <div style={s.msgContainerDiv}>
          <div style={s.msgDiv}>
            {customers && customers.map(userInfo => <CustomerInfo key={userInfo.id} userInfo={userInfo} selectUser={this.toggleAddToSendList}/>)}
          </div>
          <div style={s.sendCmdContainerDiv}>
            <textarea style={s.textArea} placeholder={"Your message"} onChange={this.storeMsg}/>
            <div className={"fb-message-blue"} style={s.sendDivBtn} onClick={this.broadcastMsg}><i/> Send</div>
          </div>
        </div>

      </div>
    )
  }
}
