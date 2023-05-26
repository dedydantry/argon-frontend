
export default function InputGroup({label, type, buttonLabel, placeholder}) {
  return (
    <div>
      {
        label ? 
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
        : <></>
      }
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type={type}
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={placeholder}
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}


InputGroup.defaultProps = {
  type:'text',
  buttonLabel:'Search',
  placeholder:'Write something...'
}