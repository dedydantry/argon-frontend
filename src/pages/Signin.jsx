import { useRef,useState } from "react"
import api from '../plugins/api'
import Alert from "../components/Alert"
import { XCircleIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../store/authentication'
import { useNavigate } from "react-router-dom"

export default function Signin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const emailRef = useRef() 
  const passwordRef = useRef() 

  const fetchProfile = async(token) => {
    try {
      const {data} = await api.get(`/api/me`, {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      return null
    }
  }
  const onSubmit = async(e) => {
    e.preventDefault()

    try {
      setError('')
      const params = {
        email:emailRef.current.value,
        password:passwordRef.current.value
      }
      const request = await api.post(`/api/signin`, params)
      if(typeof request.message != 'undefined'){
        return setError(request.message)
      }
      
      const profil = await fetchProfile(request.token)
      profil.token = request.token
      
      dispatch(handleLogin(profil))
      navigate('/home')
    } catch (error) {
      setError(error.message)
      return console.log(error.message)
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {
            error ? <Alert
              title={error}
              icon={<XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
            /> : <></>
          }
          <form className="space-y-6 mt-3" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  ref={passwordRef}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
  