import React from "react";

export default function Card({ title, children, actionName, action, secondAction, secondActionName, hideTitle, hideBody, removePadding }) {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow border border-gray-200">
            {!hideTitle && <div className="border-b border-gray-200 px-4 py-4 sm:px-6 flex items-center justify-between">
                <h2 className="text-md font-medium">{title}</h2>
                <span className="flex gap-3">
                    {secondAction &&
                        <button
                            type="button"
                            className="transition rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100"
                            onClick={secondAction}
                        >
                            {secondActionName}
                        </button>}
                    {action &&
                        <button
                            type="button"
                            className="transition rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={action}
                        >
                            {actionName}
                        </button>
                    }
                </span>
            </div>}
            {!hideBody && removePadding && <div className="bg-gray-50">{children}</div>}
            {!hideBody && !removePadding && <div className="bg-gray-50 px-4 py-5 sm:p-6">{children}</div>}
        </div>
    )
}
