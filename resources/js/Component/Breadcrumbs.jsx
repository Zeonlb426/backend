import React from 'react';
import {InertiaLink} from "@inertiajs/inertia-react";
import {HomeIcon} from '@heroicons/react/24/outline';

export default function Breadcrumbs({ hrefName, parentName, className, children }) {
    return (
        <div className={className}>
            <InertiaLink
                href={route('home')}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline"
            >
                <HomeIcon className="h-4 w-4" aria-hidden="true" />
            </InertiaLink>
            <span className="mx-2 text-slate-500 dark:text-slate-400">/</span>
            <InertiaLink
                href={route(hrefName)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline"
            >
                {parentName}
            </InertiaLink>
            <span className="mx-2 text-slate-500 dark:text-slate-400">/</span>
            {children}
        </div>
    );
}
