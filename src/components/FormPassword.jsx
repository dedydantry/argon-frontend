import { useRef } from "react"

export default function FormPassword({onClose, onSubmit}){

  const passwordRef = useRef()
  const newPasswordRef = useRef()
  const confirmPasswordRef = useRef()

  const onSumbitForm = (e) => {
    e.preventDefault()
    const params = {
      password:passwordRef.current.value,
      confirm_password:confirmPasswordRef.current.value,
      new_password:newPasswordRef.current.value
    }

    return onSubmit(params)
  }
  return(
    <form className="bg-white shadow-sm  sm:rounded-xl md:col-span-2" onSubmit={onSumbitForm}>
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
          <div className="sm:col-span-4">
            <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  ref={passwordRef}
                  type="password"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
              New Password
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  ref={newPasswordRef}
                  type="password"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm password
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  ref={confirmPasswordRef}
                  type="password"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6  px-4 py-4 sm:px-8">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )

}