import axios from "axios"
import Cookies from "js-cookie"
const config = {
  baseURL: import.meta.env.VITE_API_HOST || "http://localhost:3001"
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = Cookies.get("accessToken")
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    response = typeof response.data !== 'undefined' ? response.data : response
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)


export default _axios
