import dayjs from "dayjs"

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function formatHour(arg){
    if(!arg) return ''
    return dayjs(arg).format('HH:mm')
}

export function formatDate(arg){
    if(!arg) return '-'
    return dayjs(arg).format('DD-MM-YYYY')
}