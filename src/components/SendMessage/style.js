import "./messengerBtn.css"
const _5px = 5
const _10px = 10

export const style = {
  rootDiv: {
    border: "1px solid black",
    borderRadius: 5,
    padding: _10px,
    marginBottom: _10px,
  },
  pageName:{
    fontSize: 16,
    fontWeight: "bold",
  },
  msgContainerDiv: {
    display: "flex",
    maxHeight: "25vh",
  },
  msgDiv: {
    display: "block",
    flex: 1,
  },
  sendCmdContainerDiv:{
    display: "block",
    maxWidth: 320,
    width: "25%",
  },
  textArea: {
    width: "100%",
    outline: "none",
    cols: 30,
    rows: 2,
    wrap: "off",
    resize: "none",
    borderRadius: _5px,
    fontFamily: "Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif",
    linHeight: 1.28,
    WebkitFontSmoothing: "antialiased",
    padding: _5px,
    boxSizing: "border-box",
  },
  sendDivBtn: {
    cursor: "pointer",
  }
}
