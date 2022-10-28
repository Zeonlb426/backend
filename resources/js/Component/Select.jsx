import React, {Fragment} from 'react';
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";

export default function Select({
    name = '',
    options = [],
    value = '',
    required = false,
    handleSelect,
    placeholder = '',
    label = '',
    classLabel = '',
    }) {

    return (
        <div className="w-full">
            <label htmlFor={name} className={`${!label && 'hidden'} relative text-sm font-bold text-slate-700 dark:text-slate-300` + classLabel}>
                {label} { required ?
                <span className="absolute flex gap-[2px] -top-[8px] right-0 translate-x-full text-red-600">
                    <span className="text-xl leading-none mt-[2px]">*</span>
                    <span className="hidden sm:block text-[10px]"> required</span>
                </span> : '' }
            </label>
            <Listbox value={value} onChange={e => handleSelect(e, name)}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className={'relative cursor-pointer w-full min-h-[42px] flex gap-1 flex-wrap ' +
                        'items-center pl-2 pr-6 py-1 border border-slate-300 dark:border-slate-500 bg-white ' +
                        'dark:bg-slate-900 shadow-sm dark:text-white focus:border-indigo-300 ' +
                        'focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md text-sm'}
                    >
                        {value ? (
                            <div className="grid grid-cols-[24px_1fr] gap-6">
                                <img
                                    className="block h-6 w-6"
                                    src={window.location.origin + "/vendor/img/" + value + ".svg"}
                                    alt="Ratio"
                                />
                                <div>{value}</div>
                            </div>
                        ) : (
                            <span className="block text-sm text-slate-400 dark:text-slate-500">
                                {placeholder}
                            </span>
                        )}
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" aria-hidden="true"/>
                    </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Listbox.Options
                            className={"absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900 " +
                            "py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10 " +
                            "border border-slate-300 dark:border-slate-500"}
                        >
                            {options.map((item, id) => (
                                <Listbox.Option
                                    key={id}
                                    value={item.value}
                                    className={({ active, selected }) =>
                                        `relative cursor-default flex items-center gap-2 select-none py-2 pl-10 pr-4 ${
                                            selected ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white '
                                                : 'text-slate-700 dark:text-slate-300'
                                        } ${
                                            active ? 'bg-slate-100 dark:bg-slate-600 text-slate-900 dark:text-white '
                                                : 'text-slate-700 dark:text-slate-300'
                                        } `
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <div className="grid grid-cols-[24px_1fr] gap-6">
                                                <img
                                                    className="block h-6 w-6"
                                                    src={window.location.origin + "/vendor/img/" + item.value + ".svg"}
                                                    alt="Ratio"
                                                />
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {item.label}
                                                </span>
                                            </div>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
