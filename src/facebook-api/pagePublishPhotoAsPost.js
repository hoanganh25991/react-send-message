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

export const publishPhotoAsPost = ({pageId, pageToken}) => async ({text: message, file}) => {
  const res = await axios.post(`${endpoint}/${pageId}/photos=${message}&access_token=${pageToken}`)
  const {error} = res
  if(error) return _("[publishPostX] err", error)
  return true
}