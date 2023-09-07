import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom"

import { tokenManager } from "../managers/TokenManager";

export default function NavBar() {
    const navigate = useNavigate();

    const elementClassNames = 'h-full flex items-center border-b-2 data-[active=true]:border-indigo-500 px-1 pt-1 text-sm font-medium data-[active=true]:text-gray-900 text-gray-500 border-transparent hover:border-gray-300'
    return (
        <div as="nav" className="bg-white shadow z-10">
            <div className="flex items-center flex-row">
                <div className="flex h-16 justify-between w-full items-center px-4">
                    <div className="ml-6 flex space-x-8 h-full">
                        {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                        <NavLink
                            to={"/"}
                        >
                            {({ isActive }) => (
                                <p className={elementClassNames} data-active={isActive}>Welcome</p>
                            )}
                        </NavLink>
                        <NavLink
                            to={"/help"}
                        >
                            {({ isActive }) => (
                                <p className={elementClassNames} data-active={isActive}>Help</p>
                            )}
                        </NavLink>
                        <NavLink
                            to={"/dashboard"}
                        >
                            {({ isActive }) => (
                                <p className={elementClassNames} data-active={isActive}>Dashboard</p>
                            )}
                        </NavLink>
                    </div>
                    {tokenManager.isReady() && (
                        <button
                            type="button"
                            className="h-fit rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            onClick={() => { tokenManager.wipe(); navigate("/link") }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>)
}
