import Button from '../components/Button';
import Popup from '../components/Popup';
import { useEffect, useState } from 'react';
import ProfilForm from '../components/ProfilForm';
import FormPassword from '../components/FormPassword';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import api from '../plugins/api'

export default function Profile(){
  const [user, setUser] = useState(null)
  const [popupToggle, setPopupToggle] = useState(false)
  const [popupMode, setPopupMode] = useState('')

  const fetchProfile = async() => {
    try {
      const {data} = await api.get('/api/me')
      setUser({...data})
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchProfile()
  },[])

  const onEdit = () => {
    setPopupMode('edit')
    setPopupToggle(true)
  }

  const onPasswordChange = () =>{
    setPopupMode('password')
    setPopupToggle(true)
  }

  const submitPasswordForm = async(arg) => {
    try {
      if(arg.new_password !== arg.confirm_password) return  MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Invalid password confirmation`
      })

      const {data, status} = await api.patch('/api/user', arg)
      if(!status) return MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data
      })

      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password has changed'
      })
      setPopupToggle(false)
      setPopupMode('')
    } catch (error) {
      return console.log(error.message)
    }
  }
  
  const postUpdateProfile = async(arg) => {
    try {
      console.log(arg)
      const {status, data} = await api.put('/api/user', arg)
      if(!status) return  MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data
      })
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Has updated'
      })
      setPopupToggle(false)
      setPopupMode('')
      fetchProfile()
    } catch (error) {
      return console.log(error.message)
      
    }
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full md:w-2/6 bg-white border border-gray-100 px-5 py-5 rounded-lg">
          <img className="w-full rounded-2xl " src={user?.photo} alt="" />
          <h1 className="text-md text-center py-2 text-gray-600">
            {user?.title}
          </h1>
          <ul className="w-full mt-2">
            <li className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-600 font-bold">Email</span>
              <span className="text-gray-500">{user?.email}</span>
            </li>
            <li className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-600 font-bold">Name</span>
              <span className="text-gray-500">{user?.name}</span>
            </li>
            <li className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-600 font-bold">Phone</span>
              <span className="text-gray-500">{user?.phone}</span>
            </li>
          </ul>
          <div className="py-2">
            <Button label="Edit" onClick={onEdit}/>
            <Button label="Change password" onClick={onPasswordChange}/>
          </div>
        </div>
      </div>
      <Popup
        open={popupToggle}
        setOpen={setPopupToggle}
      >
        {popupMode === 'password' ? 
        <FormPassword onClose={() => setPopupToggle(false)} onSubmit={submitPasswordForm}/> 
        :
         <ProfilForm onClose={() => setPopupToggle(false)} onSubmit={postUpdateProfile}/>}
      </Popup>
    </>
  )

}