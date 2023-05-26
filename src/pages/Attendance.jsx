import { useEffect, useRef, useState } from "react"
import Button from "../components/Button"
import api from '../plugins/api'
import { formatHour } from "../helpers"
import { useSelector } from 'react-redux'
import dayjs from "dayjs"

export default function Attendance() {

  const store = useSelector(state => state.auth)

  const [attendances, setAttendances] = useState([])
  const [users, setUsers] = useState([])

  const beginRef = useRef()
  const endRef = useRef()
  const employeeRef = useRef()

  const fetchAttendance = async() => {
    try {
      const {data} = await api.get(`/api/attendance?begin_date=${beginRef.current.value}&end_date=${endRef.current.value}&employee=${employeeRef.current?.value}`)
      const result = data.map(x => {
        x.working_hour = 0
        if(x.clock_in && x.clock_out){
          const beginD = dayjs(x.clock_in)
          const endD = dayjs(x.clock_out)
          const workingHour = endD.diff(beginD, 'm')
          x.working_hour = workingHour /60
        }
        return x
      })
      setAttendances([...result])
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchUser = async() => {
    try {
      const {data} = await api.get('/api/user')
      setUsers([...data])
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchAttendance()
    fetchUser()
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-72 mr-2 mb-2 md:mb-0">
              <input
                ref={beginRef}
                type="date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Begin date"
              />
            </div>
            <div className="w-full md:w-72 mr-2 mb-2 md:mb-0">
              <input
                ref={endRef}
                type="date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="End Date"
              />
            </div>
            {
              store.userData.is_admin ? 
              <div className="w-full md:w-72 mb-2 md:mb-0">
                <select
                  ref={employeeRef}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue="Canada"
                >
                  <option value="">Select Employee</option>
                  {
                    users.map(x => (
                      <option value={x.id} key={x.id}>{x.email}</option>
                    ))
                  }
                </select>
              </div> : <></>
            }
            <div className="px-0 md:px-2">
              <Button label="Filter" onClick={fetchAttendance}/>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Periode
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Clock In
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Clock Out
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Working Hour
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendances.map((x) => (
                  <tr key={x.id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img className="h-11 w-11 rounded-full" src={x.user.photo} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{x.user.name}</div>
                            <div className="mt-1 text-gray-500">{x.user.email}</div>
                          </div>
                        </div>
                      </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{x.periode}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{x.clock_in ? formatHour(x.clock_in) : '-'}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{x.clock_out ? formatHour(x.clock_out) : '-'}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{parseFloat(x.working_hour).toFixed(1)} Hr</td>
                  </tr>
                ))}

                {
                  !attendances.length ? 
                  <tr>
                    <td colSpan="5" className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">Empty attendance</td>
                  </tr> : <></>
                }
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
