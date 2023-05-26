import { classNames } from "../helpers"

export default function ClockButton({children, label, onClick, color}){
  return (
    <>
      <div className="w-full my-5 flex flex-wrap justify-center">
          <button
            onClick={onClick}
            type="button"
            className={classNames(
              color,
              'w-40 h-40 rounded-full px-2.5 py-1 text-md font-semibold text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
            )}
          >
            {children}
            {label}
          </button>
      </div>
    </>
  )
}