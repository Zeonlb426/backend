import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import Divider from "@/Component/Divider";

export default function Award({ item, setData, index, data }) {

    const handleChangeAward = (e, id) => {
        data.award[id][e.target.name] = e.target.value
        setData((data) => ({
            ...data,
            ['award']: [...data.award],
        }))
    }

    const removeElement = (id) => {
        let finalArray = data['award'].filter((e, idx) => idx !== id );
        if (finalArray.length === 0){
            setData(values => ({...values, ['image_award']: null, ['show_award']: false, ['sort_award']: 0}))
        }
        setData((data) => ({
            ...data,
            ['award']: finalArray,
        }))
    }

    return (
        <div key={index}>
            <Divider />
            <div className="grid grid-cols-[1fr_52px] gap-6 mb-6" key={index}>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-[1fr_1fr_102px_1fr] gap-2 md:gap-6">
                    <div className={'w-full'}>
                        <label htmlFor={"name"} className={`relative text-sm font-bold text-slate-700 dark:text-slate-300 `}>
                            Award name:
                        </label>
                        <input
                            type={'text'}
                            name={"name"}
                            value={item.name}
                            className={'w-full border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 ' +
                            'shadow-sm dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 ' +
                            'focus:ring-opacity-50 rounded-md text-sm'}
                            onChange={(e) => handleChangeAward(e, index)}
                        />
                    </div>
                    <div className={'w-full'}>
                        <label htmlFor={"nomination"} className={`relative text-sm font-bold text-slate-700 dark:text-slate-300 `}>
                            Nomination:
                        </label>
                        <input
                            type={'text'}
                            name={"nomination"}
                            value={item.nomination}
                            className={'w-full border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 ' +
                            'shadow-sm dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 ' +
                            'focus:ring-opacity-50 rounded-md text-sm'}
                            onChange={(e) => handleChangeAward(e, index)}
                        />
                    </div>
                    <div className={'w-full'}>
                        <label htmlFor={"date"} className={`relative text-sm font-bold text-slate-700 dark:text-slate-300 `}>
                            Date:
                        </label>
                        <input
                            type={'text'}
                            name={"date"}
                            value={item.date}
                            className={'w-full border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 ' +
                            'shadow-sm dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 ' +
                            'focus:ring-opacity-50 rounded-md text-sm'}
                            onChange={(e) => handleChangeAward(e, index)}
                        />
                    </div>
                    <div className={'w-full'}>
                        <label htmlFor={"url"} className={`relative text-sm font-bold text-slate-700 dark:text-slate-300 `}>
                            Link to source:
                        </label>
                        <input
                            type={'text'}
                            name={"url"}
                            value={item.url}
                            className={'w-full border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 ' +
                            'shadow-sm dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 ' +
                            'focus:ring-opacity-50 rounded-md text-sm'}
                            onChange={(e) => handleChangeAward(e, index)}
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="mt-[24px] px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md " type="button" onClick={(e) => removeElement(index)}>
                        <TrashIcon className="h-4 w-4 text-white mx-auto"/>
                    </button>
                </div>
            </div>
        </div>
    );
}