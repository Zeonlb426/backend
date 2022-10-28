import React, {useEffect} from 'react';
import {Link, usePage} from "@inertiajs/inertia-react";
import {Menu} from "@headlessui/react";
import {Disclose} from "@/Component/Disclose";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function SiteMenu({navigation}) {
    const { prefix } = usePage().props;
    const current = (title) => {
        let arr = title.split('/');
        return window.location.pathname.split('/').includes(arr[arr.length - 1]);
    }
    return (
        <Menu className="py-4">
            <Menu.Items static>
                {navigation.map((item, index) => item.submenu ? (
                    <Disclose
                        prefix={prefix}
                        item={item}
                        key={index}
                        ckey={index}
                        initialOpen={current(item.url)}
                        current={current}
                        className="w-full py-2" />
                    ) : (
                    <Menu.Item key={index}>
                        {({ active }) => (
                            <Link href={prefix ? ('/'+ prefix + item.url) : item.url} className={classNames('block text-slate-700 dark:text-slate-100 p-3 my-1 mx-2 text-sm rounded-lg',
                                current(item.url) ? 'bg-slate-200 dark:bg-slate-900' : '',
                                active ? 'bg-slate-100 dark:bg-slate-700' : '')}
                            >
                                <div className="flex items-center">
                                    <item.icon className="block h-6 w-6 mr-3"/>
                                    {item.title}
                                </div>
                            </Link>
                        )}
                    </Menu.Item>
                    )
                )}
            </Menu.Items>
        </Menu>
    );
}
