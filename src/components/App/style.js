const _20px = 20
const curveRadius = 5

export const style = {
  rootDiv: {
    border: "1px solid black",
    borderRadius: curveRadius,
    padding: _20px
  },
  sendMsgDiv: {
    width: 250,
    minWidth: 320,
  },
  title: {
    fontSize: "1.6em",
    fontWeight: "bold",
    textAlign: "center"
  },
  sendMsgDivHasData: {
    display: "flex",
    width: "75vw",
    height: "80vh",
    overflowY: "auto",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}
