import {ClockIcon,CheckCircleIcon,ArrowRightOnRectangleIcon} from '@heroicons/react/24/outline'
import ClockButton from '../components/ClockButton'
import api from '../plugins/api'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { formatHour } from '../helpers'

export default function Home(){

	const [attendance, setAttendance] = useState(null)
	const time = dayjs().format('HH:mm')
	const date = dayjs().format("dddd, MMMM D");

	const fetchAttendance = async() => {
		try {
			const {data} = await api.get('/api/attendance/current')
			if(data){
				data.total_hour = renderWorkingHour(data)
			}
			setAttendance({...data})
		} catch (error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		fetchAttendance()
	},[])

	const renderClockTime = (arg) => {
		if(arg) return (<span className='text-sm text-gray-600 font-bold'>{formatHour(arg)}</span>)
		return (<span className='text-sm text-gray-600 font-bold'>--:--</span>)
	}


	const renderWorkingHour = (arg) => {
		if (!arg || (!arg.clock_in || !arg.clock_out)) {
			return 0;
		}
		const beginDate = dayjs(arg.clock_in);
		const endDate = dayjs(arg.clock_out);
		const totalHour = endDate.diff(beginDate, 'm');
		return totalHour / 60
	};


	const postAttendance = async() => {
		try {
			if(attendance && (attendance.clock_in && attendance.clock_out)) return
			await api.post('/api/attendance')
			return fetchAttendance()
		} catch (error) {
			console.log(error)
		}
	}

	return(
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="xs:w-full sm:w-2/4 md:w-2/5 mx-auto">
					<div className="w-full border border-gray-100 px-5 py-5 rounded-lg bg-white">
							<h1 className="font-semibold text-4xl text-center text-gray-700 py-1">{time}</h1>
							<h2 className="text-md text-center text-gray-600">{date}</h2>
							<ClockButton
								label={!attendance || !attendance.clock_in ? 'CLOCK IN' : 'CLOCK OUT'}
								color={!attendance || !attendance.clock_in ? 'bg-sky-600 hover:bg-sky-500' : 'bg-orange-600 hover:bg-orange-500'}
								onClick={postAttendance}
							>
								<ArrowRightOnRectangleIcon
									className="text-center h-14 w-14 mx-auto shrink-0 text-white font-bold group-hover:text-indigo-600"
									aria-hidden="true"
								/>
							</ClockButton>

							<ul className="w-full flex flex-wrap mt-10 px-5 py-10">
								<li className='w-1/3'>
									<div className='flex justify-center'>
											<ClockIcon
													className="text-center h-6 w-6 shrink-0 text-sky-700 font-bold group-hover:text-indigo-600"
													aria-hidden="true"
												/>
									</div>
									<div className="flex flex-col text-center">
											{renderClockTime(attendance?.clock_in)}
											<span className='text-xs text-gray-400'>Clock in</span>
									</div>
								</li>
								<li className='w-1/3'>
									<div className='flex justify-center'>
										<ClockIcon
											className="text-center h-6 w-6 shrink-0 text-sky-700 font-bold group-hover:text-indigo-600"
											aria-hidden="true"
										/>
									</div>
									<div className="flex flex-col text-center">
											{renderClockTime(attendance?.clock_out)}
											<span className='text-xs text-gray-400'>Clock Out</span>
									</div>
								</li>
								<li className='w-1/3'>
									<div className='flex justify-center'>
										<CheckCircleIcon
											className="text-center h-6 w-6 shrink-0 text-sky-700 font-bold group-hover:text-indigo-600"
											aria-hidden="true"
										/>
									</div>
									<div className="flex flex-col text-center">
											<span className='text-sm text-gray-600 font-bold'>{attendance && attendance.total_hour ? parseFloat(attendance.total_hour).toFixed(1) : '0'}</span>
											<span className='text-xs text-gray-400'>Working Hr's</span>
									</div>
								</li>
							</ul>
					</div>
				</div>
			</div>
		</>
	)
}