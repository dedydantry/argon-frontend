// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialUser = () => {
  const item = Cookies.get('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

const initialToken = () => {
  const token = Cookies.get('accessToken')
  return token ? token : null
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    token:initialToken(),
  },
  reducers: {
   
    handleLogin: (state, action) => {
      const params = {
        id:action.payload.id,
        name:action.payload.name,
        email:action.payload.email,
        photo:action.payload.photo,
        is_admin:action.payload.is_admin,
        title:action.payload.title,
        phone:action.payload.phone
      }
      state.userData = params
      state.accessToken = action.payload.token
      Cookies.set('userData', JSON.stringify(params), { expires: 1 })
      Cookies.set('accessToken', action.payload.token, { expires: 1 })
    },
    handleLogout: state => {
      state.userData = null
      state.token = null
      Cookies.remove('userData')
      Cookies.remove('accessToken')
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
