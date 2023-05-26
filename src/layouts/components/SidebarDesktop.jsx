import { useEffect, useState } from "react"
import { classNames } from "../../helpers"
import {
    Cog6ToothIcon,
  } from '@heroicons/react/24/outline'
import { useLocation,Link } from 'react-router-dom'

export default function SidebarDesktop({navigation}){
  const location = useLocation()
  const [menus, setMenus] = useState([])

  const generateMenu = () => {
    const routeName = location.pathname
    const arr = navigation.map(x => {
      if(routeName == x.href){
        x.current = true
      }else{
        x.current = false
      }
      return x
    })

    setMenus([...arr])
  }

  useEffect(() => {
    generateMenu()
  }, [location.pathname])

  return(
      <>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-1 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {menus.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
  )
}