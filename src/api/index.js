import OAxios from "axios"
import dotenv from "dotenv"

dotenv.config()
const {REACT_APP_API_ENDPOINT: endPoint} = process.env

const axios = OAxios.create({timeout: 3000})

export const getPageInsights = async fbId => {
  const res = await axios.get(`${endPoint}/${fbId}`)
  const {data: pageInsights} = res
  return {pageInsights}
}