import {
    CalendarIcon,
    HomeIcon,
    UsersIcon,
  } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '/home', icon: HomeIcon, current: true},
    { name: 'Attendance', href: '/attendance', icon: CalendarIcon, current: false },
    { name: 'Employee', href: '/employee', icon: UsersIcon, current: false, permission:'admin' },
]

export default navigation