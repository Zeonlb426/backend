import React, {Fragment} from 'react';
import {PlusIcon, TrashIcon} from "@heroicons/react/24/outline";

export default function DynamicInput({
                                         name = '',
                                         data = [],
                                         handleChangeBlock,
                                         removeElement,
                                         addElement,
                                         required = false,
                                         label = '',
                                         classLabel = '',
                                         classInput = '',
    }) {

    return (
        <div className="w-full">
            <label htmlFor={name}
                   className={`${!label && 'hidden'} relative text-sm font-bold text-slate-700 dark:text-slate-300` + classLabel}
            >
                {label} { required ?
                <span className="absolute flex gap-[2px] -top-[8px] right-0 translate-x-full text-red-600">
                    <span className="text-xl leading-none mt-[2px]">*</span>
                    <span className="hidden sm:block text-[10px]"> required</span>
                </span> : '' }
            </label>
            {data.map((item, index) => (
                <div className="grid grid-cols-[1fr_52px] gap-2 mb-2" key={index}>
                    <div className="grid">
                        <input
                            type={'text'}
                            name={name}
                            value={item}
                            className={'w-full border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 ' +
                            'shadow-sm dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 ' +
                            'focus:ring-opacity-50 rounded-md ' + classInput}
                            onChange={(e) => handleChangeBlock(e, name, index)}
                        />
                    </div>
                    <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
                            type="button"
                            onClick={(e) => removeElement(name, index)}>
                        <TrashIcon className="h-4 w-4 text-white mx-auto"/>
                    </button>
                </div>
            ))}
            <div className="flex justify-end">
                <button className={"group w-full mt-4 xs:w-auto rounded-md flex gap-1 items-center px-4 py-2 bg-slate-100 dark:bg-slate-900 " +
                "text-slate-700 dark:text-slate-100 hover:text-white hover:bg-slate-700 border border-slate-300  " +
                "dark:border-slate-600 rounded-md transition ease-in-out duration-150"}
                        type="button"
                        onClick={(e) => addElement(name, '')}>
                    <PlusIcon className="h-5 w-5 text-slate-700 dark:text-slate-100 mx-auto group-hover:text-white"/>
                    <span className="hidden sm:inline text-sm mt-[2px]">Add {name}</span>
                </button>
            </div>
        </div>
    );
}
