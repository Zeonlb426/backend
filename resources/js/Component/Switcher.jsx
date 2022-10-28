import React from "react";
import {Switch} from "@headlessui/react";

export default function Switcher({
                                   title = '',
                                   clarification = '',
                                   checked = true,
                                   setData,
                                   name = '',
                               }) {
    return (
        <div className="flex my-6 items-center">
            <Switch.Group>
                <Switch.Label
                    className="mr-3 text-slate-700 dark:text-slate-300 font-bold text-xl cursor-pointer"
                    passive={false}
                >
                    {title}
                    <span className="hidden sm:inline text-slate-400 font-medium text-xs">{clarification}</span>
                </Switch.Label>
                <Switch
                    checked={checked}
                    onChange={(e) => (setData(values => ({...values, [name]: e,})))}
                    className={`${checked ? ' bg-green-600 ' : ' bg-slate-200 dark:bg-slate-600 '} relative inline-flex items-center h-6 rounded-full w-11`}
                >
                    <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-white rounded-full`}/>
                </Switch>
            </Switch.Group>
        </div>
    );
}
