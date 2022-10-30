import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Inertia} from "@inertiajs/inertia";

export default function EditButton({routeName, id}) {
    const handlerClick = (e, id) => {
        e.stopPropagation();
        Inertia.get(route(routeName, id));
    };

    return (
        <button
            className={
                "group grid items-center py-2 px-4 bg-white hover:bg-slate-300 dark:bg-slate-800 " +
                "dark:hover:bg-slate-500 rounded-md border border-slate-200 dark:border-slate-600"
            }
            type="button"
            onClick={(e) => handlerClick(e, id)}
        >
            <PencilIcon className="h-4 w-4 mx-auto text-slate-900 dark:text-slate-100"/>
        </button>
    );
}
