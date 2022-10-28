import React, {useEffect, useState} from 'react';
import {InertiaLink, Link} from "@inertiajs/inertia-react";
import {Bars3Icon, ChevronRightIcon, CubeIcon, HomeIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {Transition} from "@headlessui/react";
import AppLogo from "@/Component/AppLogo";
import SiteMenu from "./SiteMenu";
import {navigation} from '@/config/Navigation';

export default function SideBar({
    showingMenu,
    setShowingMenu
}) {

    return (
        <Transition
            show={showingMenu}
            className="p-4 h-screen fixed w-72 z-10"
            enter="transition duration-500 ease-out"
            enterFrom="transform -translate-x-[100%] transform-gpu"
            enterTo="transform translate-x-0 transform-gpu"
            leave="transition duration-500 ease-out"
            leaveFrom="transform translate-x-0 transform-gpu"
            leaveTo="transform -translate-x-[100%] transform-gpu"
        >
            <div className="min-h-full bg-white dark:bg-slate-800 shadow rounded-lg" >
                <div className="flex justify-around items-center p-4" >
                    <AppLogo className="flex h-[56px] w-auto justify-center" />
                    <button onClick={() => setShowingMenu((previousState) => !previousState)}
                            className="h-10 inline-flex lg:hidden items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900  dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 transition duration-150 ease-in-out"
                    >
                        {showingMenu ? (<XMarkIcon className="block h-6 w-6" aria-hidden="true" />) : (<Bars3Icon className="block h-6 w-6" aria-hidden="true" />)}
                    </button>
                </div>
                <hr className="shrink-0 border-black border-x-0 border-t-0 border-solid h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-500 to-transparent"/>
                <SiteMenu navigation={navigation}/>
            </div>
        </Transition>

    );
}
