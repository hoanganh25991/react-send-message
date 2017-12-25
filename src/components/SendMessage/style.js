import "./messengerBtn.css"
const _5px = 5
const _10px = 10
const _15px = 15

export const style = {
  rootDiv: {
    // border: "1px solid black",
    borderRadius: 5,
    padding: _10px,
    marginBottom: _15px,
    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.2), 0 2px 10px 0 rgba(0,0,0,0.19)",
  },
  pageName:{
    fontSize: 16,
    fontWeight: "bold",
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
    width: "100%",
    outline: "none",
    cols: 30,
    rows: 2,
    wrap: "off",
    resize: "none",
    borderColor: "#E0E0E0",
    // color: "#E0E0E0",
    borderRadius: _5px,
    fontFamily: "Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif",
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
