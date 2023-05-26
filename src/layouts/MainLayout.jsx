import { Fragment, useState, useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Header from './components/Header'
import SidebarDesktop from './components/SidebarDesktop'
import SidebarMobile from './components/SidebarMobile'
import { useSelector } from 'react-redux'
import navigation from './menu'
import io from 'socket.io-client'
const socket = io('http://localhost:8080')
import Notification from '../components/Notification'

export default function MainLayout({children}) {

  const store = useSelector(state => state.auth)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [menu,setMenu] = useState([])
  const [notifToggle,setNotifToggle] = useState(false)
  const [message, setMessage] = useState('')

  useState(() => {
    let newMenu =  []
    if(!store.userData.is_admin){
      newMenu = navigation.filter(x => !x.permission)
    }else{
      newMenu = navigation
    }
    setMenu([...newMenu])
  })

  useEffect(() => {
    socket.connect()

    if(store.userData.is_admin){
      socket.on('notification', (message) => {
        setMessage(message)
        setNotifToggle(true)
        setTimeout(() => {
          setNotifToggle(false)
          setMessage('')
        }, 3000)
      })
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-1 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <SidebarMobile navigation={menu}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <SidebarDesktop navigation={menu}/>

        <div className="lg:pl-72">

          <Header
            sidebarToggle={(e) => setSidebarOpen(e)}
          />

          <main className="py-10">
            {children}
          </main>
        </div>
      </div>
      <Notification
        show={notifToggle}
        setShow={setNotifToggle}
        message={message}
      />
    </>
  )
}
