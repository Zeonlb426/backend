import {TrashIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Inertia} from "@inertiajs/inertia";

export default function DeleteButton({ children, routeName, id, className , disabled=false }) {

    const destroy = (e, id) => {
        e.stopPropagation();
        let question = 'Вы уверены, что хотите УДАЛИТЬ ' + (Array.isArray(id) && (id.length > 1) ? 'эти записи' : 'эту запись?');
        if (confirm(question)) {
            Inertia.delete(route(routeName, JSON.stringify(id)));
        }
    };

    return (
        <button
            disabled={disabled}
            className={className}
            type="button"
            onClick={(e) => destroy(e, id)}
        >
            <TrashIcon className="h-4 w-4 mx-auto"/>
            {children}
        </button>
    );
}
