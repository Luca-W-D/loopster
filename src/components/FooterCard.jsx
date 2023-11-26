import React from "react";

export default function FooterCard({ title, children, actionName, action, secondAction, secondActionName, minorAction, minorActionName }) {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow border border-gray-200">
            <div className="border-b border-gray-200 px-4 py-4 sm:px-6 flex items-center justify-between">
                <h2 className="text-md font-bold">{title}</h2>
                <span className="float-right">
                    {minorAction && <button
                            type="button"
                            className="text-sm font-semibold text-indigo-500"
                            onClick={minorAction}
                        >
                            {minorActionName}
                        </button>}
                </span>
            </div>
            <div className="bg-gray-50 p-5">{children}</div>
            <div className="border-t border-gray-200 px-4 py-2 sm:px-6 flex items-center justify-between">
                <button onClick={secondAction} className="border-gray-400 text-md font-semibold py-2 rounded-md">{secondActionName}</button>
                <button onClick={action} className="bg-indigo-500 border border-gray-400 text-md font-semibold text-white px-4 py-2 rounded-md ">{actionName}</button>
            </div>
        </div>
    )
}
