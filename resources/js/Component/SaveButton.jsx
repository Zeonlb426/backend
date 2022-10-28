import React from "react";
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";

export default function SaveButton({ processing }) {
    return (
        <button
            type='submit'
            className={'flex gap-1 text-sm items-center px-4 py-2 rounded-md ' +
            'bg-green-600 hover:bg-green-700 text-white disabled:opacity-25 ' +
            'border border-green-700  dark:border-green-600 ' +
            'transition ease-in-out duration-150'}
            disabled={processing}
        >
            <ArrowDownTrayIcon className="h-4 w-4"/>
            <span className="hidden sm:inline pt-[2px]">Save</span>
        </button>
    );
}
