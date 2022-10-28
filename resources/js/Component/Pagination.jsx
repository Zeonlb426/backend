import React from 'react';
import {InertiaLink} from '@inertiajs/inertia-react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const PageLink = ({active, label, url}) => {
    return (
        <InertiaLink
            className={classNames(
                'mr-1 mb-1 px-2 py-1 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none',
                active ? ' bg-slate-200 dark:bg-slate-900' : ''
            )}
            href={url}
        >
            <span dangerouslySetInnerHTML={{__html: label}}/>
        </InertiaLink>
    );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({label}) => {
    return (
        <div
            className={classNames('mr-1 mb-1 px-2 py-1 text-xs border rounded border-solid border-slate-300 text-slate-700 dark:text-slate-100 opacity-30')}
            dangerouslySetInnerHTML={{__html: label}}
        />
    );
};

export default ({links = []}) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length === 3) return null;
    return (
        <div className="flex flex-wrap mt-6 -mb-1">
            {links.map(({active, label, url}) => {
                return url === null ? (
                    <PageInactive key={label} label={label}/>
                ) : (
                    <PageLink key={label} label={label} active={active} url={url}/>
                );
            })}
        </div>
    );
};
