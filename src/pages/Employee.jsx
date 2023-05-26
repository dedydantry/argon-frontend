import { useEffect, useState } from "react"
import api from '../plugins/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Popup from "../components/Popup"
import EmployeeForm from "../components/EmployeeForm"
const MySwal = withReactContent(Swal)

export default function Employee() {

  const [popupToggle, setPopupToggle] = useState(false)
  const [employee, setEmployee] = useState([])

  const fetchEmployee = async() => {
    try {
      const {data} = await api.get('/api/user')
      setEmployee([...data])
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchEmployee()
  },[])

  const onDelete = (item) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await api.delete(`/api/user/${item.id}`)
        const emp = employee.filter(x => x.id !== item.id)
        setEmployee([...emp])
      }
    });
  }

  const onAddEmployee = async(arg) => {
    try {
      const {data,status} = await api.post('/api/user', arg)
      if(!status) return MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data
      })
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Employee has created'
      })
      setEmployee([
        ...employee,
        data
      ])
      setPopupToggle(false)
    } catch (error) {
      return console.log(error.message)
    }
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Employees</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the employee in your account including their name, title, email and phone.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => setPopupToggle(true)}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Employee
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Title
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Phone
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {employee.map((x,index) => (
                      <tr key={x.email} className="even:bg-gray-50">
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img className="h-11 w-11 rounded-full" src={x.photo} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{x.name}</div>
                              <div className="mt-1 text-gray-500">{x.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{x.title}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{x.phone}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <a href="#" onClick={() => onDelete(x)} className="text-indigo-600 hover:text-indigo-900">
                            Delete<span className="sr-only">, {x.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup
        open={popupToggle}
        setOpen={setPopupToggle}
      >
        <EmployeeForm onSubmit={onAddEmployee} onClose={() => setPopupToggle(false)}/>
      </Popup>
    </>
  )
}
