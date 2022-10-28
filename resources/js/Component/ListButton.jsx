import {InertiaLink} from "@inertiajs/inertia-react";
import {PlusIcon, QueueListIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function ListButton({ routeName }) {
    return (
        <InertiaLink
            href={route(routeName)}
            className={"group text-sm flex gap-1 items-center px-4 py-2 bg-slate-100 dark:bg-slate-900 " +
            "text-slate-700 dark:text-slate-100 hover:text-white hover:bg-slate-700 " +
            "border border-slate-300  dark:border-slate-600 " +
            "rounded-md transition ease-in-out duration-150"}
        >
            <QueueListIcon className="h-4 w-4 text-slate-700 dark:text-slate-100 group-hover:text-white"/>
            <span className="hidden sm:inline pt-[2px]">List</span>
        </InertiaLink>
    );
}
