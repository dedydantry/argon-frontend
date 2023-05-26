export default function Alert({children, title, icon, color}) {

  const textColor = () => {
    if(color == 'danger') return 'text-red'
    if(color == 'success') return 'text-green'
    return 'text-gray'
  }

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${textColor()}-800`}>{title}</h3>
          {
            children ? <div className={`mt-2 text-sm ${textColor()}-700`}>
              {children}
            </div> : <></>
          }
        </div>
      </div>
    </div>
  )
}
