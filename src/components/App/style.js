const _20px = 20
const curveRadius = 5

export const style = {
  rootDiv: {
    border: "1px solid black",
    borderRadius: curveRadius,
    padding: _20px
  },
  sendMsgDiv: {
    width: "75vw",
    minWidth: 320,
  },
  title: {
    fontSize: "1.6em",
    fontWeight: "bold",
    textAlign: "center"
    // padding: _20px,
  },
  sendMsgDivHasData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}
