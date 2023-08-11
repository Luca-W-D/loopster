import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar"

export default function Core() {

    const [isTokenSet, setIsTokenSet] = useState(false);
    const [tokenFunctionPointer, setTokenFunctionPointer] = useState(null);

    return (
        <div className="h-full flex flex-col">
            <NavBar isTokenSet={isTokenSet} tokenFunctionPointer={tokenFunctionPointer} />
            <div className="flex-grow overflow-y-scroll">
                <Outlet />
            </div>
        </div>
    );
}