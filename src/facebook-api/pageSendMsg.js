import dotenv from "dotenv"
import OAxois from "axios"

dotenv.config()
const { REACT_APP_FACEBOOK_GRAPH_API_ENDPOINT: endpoint } = process.env
const _ = console.log

// Custom axios instance
// With timeout & define when throw exception on status
const axios = OAxois.create({
  timeout: 20000,
  validateStatus(status) {
    return status !== 500
  }
})

export const sendMsg = ({pageId, pageToken}) => async ({text, recipientId: id}) => {
  const res = await axios.post(`${endpoint}/${pageId}/messages?access_token=${pageToken}`, {
    message: {
      text,
    },
    recipient: {
      id,
    }
  })

  const {error} = res
  if(error) return _("[sendMsg] err", error)
  return true
}