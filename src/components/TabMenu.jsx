import React, { useState } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TabMenu({ currentTab, tabs, setTab }) {

    return (
        <div className="bg-white">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={tabs.find((tab) => tab == currentTab)}
                >
                    {tabs.map((tab) => (
                        <option key={tab}>{tab}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <a
                                key={tab}
                                onClick={() => { setTab(tab) }}
                                className={classNames(
                                    tab == currentTab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'flex-grow border-b-2 py-3 px-12 text-center text-sm font-medium'
                                )}
                                aria-current={tab == currentTab ? 'page' : undefined}
                            >
                                {tab}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}