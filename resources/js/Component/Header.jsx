import React, {Fragment} from 'react';
import {InertiaLink, Link} from "@inertiajs/inertia-react";
import {Bars3Icon, BellIcon, HomeIcon, XMarkIcon} from '@heroicons/react/24/outline';
import Breadcrumbs from "@/Component/Breadcrumbs";
import {Menu, Transition} from "@headlessui/react";
import {user, userNavigation} from "@/config/Navigation";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({ className, setShowingMenu, showingMenu }) {

    // console.log(window.location.pathname);

    return (
        <div className={className}>
            <div className="flex items-center">
                <button onClick={() => setShowingMenu((previousState) => !previousState)}
                        className="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900  dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 transition duration-150 ease-in-out"
                >
                    {showingMenu ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                </button>
                <Breadcrumbs className="hidden sm:flex ml-4 items-center text-slate-500 dark:text-slate-400 text-sm" hrefName='projects.index' parentName='Project'> Edit</Breadcrumbs>
            </div>
            <div className="flex items-center">
                <button type="button"
                        className="rounded-full bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                    <Menu.Button className="flex max-w-xs items-center rounded-full">
                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-700 py-1 shadow-lg">
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.title}>
                                    {({ active }) => (
                                        <Link
                                            href={item.url}
                                            className={classNames(
                                                active ? 'bg-slate-100 dark:bg-slate-800 dark:text-slate-100' : '',
                                                'block px-4 py-2 text-sm text-slate-700 dark:text-slate-400'
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
}
