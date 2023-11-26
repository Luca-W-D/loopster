import { Link } from 'react-router-dom'

import { InformationCircleIcon } from '@heroicons/react/20/solid'

export default function Notification({text, actionText, href}) {
  return (
    <div className="rounded-md bg-blue-50 p-4 absolute top-4 right-4 border-blue-300 border-2 z-10">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">{text}</p>
          <p className="mt-3 text-sm md:ml-6 md:mt-0">
            <Link to={href} onClick={() => {localStorage.setItem("example_data", true);}} className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
              {actionText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}