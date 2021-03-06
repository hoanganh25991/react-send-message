import "./messengerBtn.css"
import "./postBtn.css"
const _5px = 5
const _7px = 7
const _10px = 10
const _15px = 15
const fontFamily = "Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif"
const boxShadow = "0 2px 5px 0 rgba(0,0,0,0.2), 0 2px 10px 0 rgba(0,0,0,0.19)"

export const style = {
  rootDiv: {
    boxShadow,
    borderRadius: 5,
    padding: _10px,
    marginBottom: _15px,
  },
  pageName:{
    fontSize: 16,
    fontWeight: "bold",
  },
  postContainerDiv: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: _5px,
  },
  textAreaPost: {
    fontFamily,
    flex: 1,
    outline: "none",
    cols: 30,
    rows: 2,
    wrap: "off",
    resize: "none",
    borderColor: "#E0E0E0",
    borderRadius: _5px,
    linHeight: 1.28,
    WebkitFontSmoothing: "antialiased",
    padding: _5px,
    boxSizing: "border-box",
    marginRight: _5px,
    minWidth: 200,
  },
  imgContainerDiv:{
    width: 200,
    display: "block",
  },
  inputImg: {
    width: "100%",
    marginBottom: _5px,
  },
  inputTxt: {
    fontFamily,
    width: "100%",
    outline: "none",
    borderColor: "#E0E0E0",
    borderRadius: _5px,
    linHeight: 1.28,
    WebkitFontSmoothing: "antialiased",
    padding: _5px,
    boxSizing: "border-box",
    marginBottom: _5px,
  },
  postDivBtn: {
    textAlign: "center"
  },
  msgContainerDiv: {
    display: "flex",
    maxHeight: "25vh",
    minHeight: 100,
    flexWrap: "wrap",
    overflowY: "auto",
    overflowX: "hidden",
  },
  msgDiv: {
    display: "block",
    flex: 1,
    marginRight: _10px,
    minWidth: 200,
  },
  sendCmdContainerDiv:{
    display: "block",
    maxWidth: 320,
    width: "25%",
    minWidth: 200,
  },
  textArea: {
    fontFamily,
    width: "100%",
    outline: "none",
    cols: 30,
    rows: 2,
    wrap: "off",
    resize: "none",
    borderColor: "#E0E0E0",
    borderRadius: _5px,
    linHeight: 1.28,
    WebkitFontSmoothing: "antialiased",
    padding: _5px,
    boxSizing: "border-box",
    marginBottom: _5px,
  },
  sendDivBtn: {
    cursor: "pointer",
    display: "inline-block"
  }
}
