import React, { PureComponent } from "react"
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
    isSending: false,
    postMsg: "",
    isPosting: false,
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
    this.setState({db, fbApp}, () => {
      this.storePageToken()
    })

    db.ref(`${mainBranch}/${pageId}/${objBranch}`).on("value", snapshot => {
      const customers = snapshot.val()
      _(`[db] [page-${pageId}] customers`, customers)
      if(!customers) return
      this.setState({customers: Object.values(customers)})
    })
  }

  storePageToken = () => {
    const {db} = this.state
    if(!db) return _("[storePageToken] No db to run")
    const {page : {id: pageId, access_token: pageToken}} = this.props
    db.ref(`${mainBranch}/${pageId}/token`).set(pageToken)
  }

  storeMsg = e => {
    const msg = e.target.value
    _("[msg]", msg)
    this.setState({msg})
  }

  isSelected = userId => {
    const {selectedCustomers} = this.state
    return Boolean(selectedCustomers.filter(id => id === userId)[0])
  }

  toggleAddToSendList = userId => {
    const {selectedCustomers: curr} = this.state
    const selected = this.isSelected(userId)
    const filteredList = curr.filter(id => id !== userId)
    const selectedCustomers = !selected ? [...curr, userId] : filteredList
    _("selectedCustomers", selectedCustomers)
    this.setState({selectedCustomers})
  }

  broadcastMsg = () => {
    _("[broadcastMsg] Sending...")
    this.setState({isSending: true})
    const {selectedCustomers, msg: text} = this.state
    const {page: {id: pageId, access_token: pageToken} = {}} = this.props
    const noCustomerSelected = selectedCustomers.length === 0

    if(noCustomerSelected) {
      window.confirm("Please pick at least one customer.")
      this.setState({isSending: false})
      return
    }

    const waitSendList = selectedCustomers.map(recipientId => {
      return sendMsg({pageId, pageToken})({text, recipientId}).catch(err => {
        _("[sendMsg][ERR]Fail at recipientId:",recipientId)
        _("[sendMsg][ERR]", err)
      })
    })

    Promise.all(waitSendList)
      .catch(err => _("[broadcastMsg][ERR]", err))
      .then(() => {
        _("[broadcastMsg] Finished")
        this.setState({
          isSending: false, // Reset send status
          msg: "", // Reset msg fill
        })
      })
  }

  storePostMsg = e => {
    const postMsg = e.target.value
    _("[postMsg]", postMsg)
    this.setState({postMsg})
  }

  publishPost = () => {
    _("[publishPost] Publishing...")
    this.setState({isPosting: true})

  }

  render() {
    const {page: {name} = {}} = this.props
    const {customers, isSending, msg, isPosting, postMsg} = this.state
    const sendBtnTxt = isSending ? "Sending..." : "Send"
    const postBtnTxt = isPosting ? "Publishing..." :"Publish"

    return (
      <div style={s.rootDiv}>
        <div style={s.pageName}>{name}</div>
        <div style={s.postContainerDiv}>
          <textarea style={s.textAreaPost} placeholder={"Your Post Message"} onChange={this.storePostMsg} value={postMsg}/>
          <div className={"postBtn"} style={s.postDivBtn} onClick={this.publishPost}>{postBtnTxt}</div>
        </div>
        {/*<div>{pageId}</div>*/}
        {/*<div>{pageToken}</div>*/}
        <div style={s.msgContainerDiv}>
          <div style={s.msgDiv}>
            {customers && customers.map(userInfo =>
              <CustomerInfo key={userInfo.id}
                userInfo={userInfo}
                selectUser={this.toggleAddToSendList}
                selected={this.isSelected(userInfo.id)}/>)}
          </div>
          <div style={s.sendCmdContainerDiv}>
            <textarea style={s.textArea} placeholder={"Your message"} onChange={this.storeMsg} value={msg}/>
            <div className={"fb-message-blue"} style={s.sendDivBtn} onClick={this.broadcastMsg}><i/> {sendBtnTxt}</div>
          </div>
        </div>

      </div>
    )
  }
}
