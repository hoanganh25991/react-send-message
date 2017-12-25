import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"

const _ = console.log

export const TOKEN_SCOPE = "email,manage_pages,read_insights,pages_messaging,read_page_mailboxes"

export default class LoginPage extends PureComponent {
  state = {
    FB: null
  }

  checkTimeOut = null

  checkFbSdk = () => {
    const FB = window.FB
    _("[FbSdk] loaded", Boolean(FB))

    if (!FB) return (this.checkTimeOut = setInterval(this.checkFbSdk, 300))
    if (this.checkTimeOut) clearInterval(this.checkTimeOut)
    this.setState({ FB })
  }

  componentDidMount() {
    this.checkFbSdk()
  }

  loginFb = async () => {
    const { FB } = this.state
    const { cbToken } = this.props
    if (!FB) return _("[WARN] Fb not loaded")

    const userAccessToken = await new Promise(rslv => {
      FB.login(
        res => {
          const { authResponse } = res
          if (!authResponse) return _("[INFO] User cancelled")
          const { accessToken: userAccessToken } = authResponse
          rslv(userAccessToken)

          _("[FB.login] res", res)
          _("[userAccessToken]", userAccessToken)
        },
        { scope: TOKEN_SCOPE }
      )
    })

    if (cbToken) {
      _("[cbToken] Run cbToken")
      cbToken(userAccessToken)
    }
  }

  render() {
    const { FB } = this.state
    const fbSdkLoaded = Boolean(FB)

    return (
      <div style={s.sendMsgDiv}>
        {!fbSdkLoaded && "FB SDK being loaded..."}
        {fbSdkLoaded && (
          <Fragment>
            <div style={s.title}>Please Login</div>
            <div style={s.subTitle}>to preview your pages insights</div>

            <div style={s.loginDiv}>
              <button className={"loginBtn loginBtn--facebook"} onClick={this.loginFb}>
                Login with Facebook
              </button>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}
