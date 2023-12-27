import { Link } from "react-router-dom";

import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function Notification({ text, actionText, href }) {
  return (
    <div className="rounded-md bg-red-50 p-4 fixed top-20 right-4 border-red-300 border-2 z-50">
      <div className="w-4 h-4 absolute -right-2 -top-2 bg-red-400 rounded-full" />
      <div className="w-4 h-4 absolute -right-2 -top-2 bg-red-400 rounded-full animate-ping" />
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-red-700">{text}</p>
          {actionText && (
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              <Link
                to={href}
                onClick={() => {
                  localStorage.setItem("example_data", true);
                }}
                className="whitespace-nowrap font-medium text-red-700 hover:text-red-600"
              >
                {actionText}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
