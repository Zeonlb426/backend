import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import {Menu} from "@headlessui/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {Link} from "@inertiajs/inertia-react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Disclose({ckey, prefix, item, initialOpen = false, current, className }) {
    const [open, setOpen] = useState(initialOpen);
    const Icon = item.icon;

    return (
        <div className={className}>
            <Menu.Item key={item.title + ckey} onClick={() => setOpen(!open)}>
                {({ active }) => (
                    <div className={classNames('cursor-pointer flex justify-between items-center text-slate-700 dark:text-slate-100 p-3 my-1 mx-2 text-sm rounded-lg',
                        active ? 'bg-slate-100 dark:bg-slate-700' : '')}
                    >
                        <div className="flex items-center">
                            <Icon className="block h-6 w-6 mr-3"/>
                            {item.title}
                        </div>
                        <ChevronRightIcon className={`${open ? 'rotate-90 transform' : ''} h-4 w-4 transition duration-150`} />
                    </div>
                )}
            </Menu.Item>
            <AnimateHeight id={'wrapper'} duration={300} height={open ? 'auto' : 0}>
                {item.submenu.map((item, index) => (
                    <Menu.Item key={ckey + '_' + index}>
                        {({ active }) => (
                            <Link href={prefix ? ('/'+ prefix + item.url) : item.url}
                                  className={classNames('block text-slate-700 dark:text-slate-100 p-3 pl-12 mx-2 text-sm rounded-lg',
                                      current(item.url) ? 'bg-slate-200 dark:bg-slate-900' : '',
                                  active  ? 'bg-slate-100 dark:bg-slate-700' : ''
                                  )}
                            >
                                {item.title}
                            </Link>
                        )}
                    </Menu.Item>
                ))}
            </AnimateHeight>
        </div>
    );
}
