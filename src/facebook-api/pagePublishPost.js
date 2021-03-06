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

export const publishPost = ({pageId, pageToken}) => async ({text: message, url, imgFile}) => {
  _("[publishPost][message, url, imgFile]", message, url, imgFile)
  const postAsPhoto = url ||  imgFile

  if(postAsPhoto){
    return publishPhotoAsPost({pageId, pageToken})({text: message, url, imgFile})
  }

  // Normal case
  const res = await axios.post(`${endpoint}/${pageId}/feed?message=${message}&access_token=${pageToken}`)
  const {error} = res
  if(error) return _("[publishPostX] err", error)
  return true
}

export const createFormData = ({imgFile, message}) => {
  const data = new FormData();
  data.append("message", message);
  data.append("source", imgFile);
  return data
}

export const publishPhotoAsPost = ({pageId, pageToken}) => async ({text: message, url, imgFile}) => {
  _("[publishPhotoAsPost]")
  const conflict = url && imgFile

  if(conflict) {
    window.alert("Please submit url or image file, not both")
    return
  }

  // Simple post
  if(url){
    const res = await axios.post(`${endpoint}/${pageId}/photos?access_token=${pageToken}`, {
      message,
      url,
    })
    const {error} = res
    if(error) return _("[publishPhotoAsPost] err", error)
    return true
  }


  // Handle form data
  const data = createFormData({imgFile, message})
  const res = await axios.post(`${endpoint}/${pageId}/photos?access_token=${pageToken}`, data)
  console.log(res)
}