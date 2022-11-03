import React from "react";
import {CheckIcon, ShieldCheckIcon, ShieldExclamationIcon} from "@heroicons/react/24/outline";
import DeleteButton from "@/Component/DeleteButton";
import EditButton from "@/Component/EditButton";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ListViewProjects({ data, selected, setSelected }) {

    const handleSelected = (id) => {
        let sel = selected.selections;
        if (sel.indexOf(id) > -1) {
            sel.splice(sel.indexOf(id), 1);
        } else {
            sel.push(id);
        }
        setSelected({selections: sel});
    }

    return (
        data.map(({ id, title, short_description, nda, sub_title, image_preview, technologies, tags }) => (
            <div key={id} onClick={() => handleSelected(id)}
                className={classNames("grid grid-cols-[16px_120px_1fr_50px] xs:grid-cols-[16px_120px_1fr_106px] sm:grid-cols-[16px_160px_1fr_106px] " +
                "xl:grid-cols-[16px_160px_3fr_44px_2fr_106px] items-center justify-between px-2 py-1 gap-2 sm:gap-4 lg:gap-10 hover:bg-slate-100 dark:hover:bg-slate-700 " +
                " border-t border-slate-200 dark:border-slate-600", selected.selections.includes(id) ? ' bg-slate-100 dark:bg-slate-900 ' : '')}
            >
                <div className="w-4 h-4 flex items-center justify-center bg-slate-100 dark:bg-slate-900
                    text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 border
                    border-slate-300  dark:border-slate-600 rounded-md transition ease-in-out duration-150"
                >
                    {selected.selections.includes(id) ? <CheckIcon className="h-4 w-4"/> : ''}
                </div>
                <div className="w-[120px] h-[60px] sm:w-[160px] sm:h-[80px] flex items-center justify-center relative overflow-hidden rounded-md ">
                    <img className="absolute" src={image_preview}/>
                </div>
                <div className="grid">
                    <span className="text-slate-900 dark:text-slate-100 font-bold text-xl truncate">
                        {title}
                    </span>
                    <div className="flex flex-wrap gap-[1px] max-w-[256px] max-h-[35px] overflow-hidden">
                        {technologies.map(({name}, index) => (
                            <span key={index} className={'text-[10px] text-teal-500 rounded dark:text-teal-400 px-1 py-0 border '+
                                'border-teal-300 whitespace-nowrap dark:border-teal-600 bg-teal-100 dark:bg-teal-900'}>
                                {name}
                            </span>
                        ))}
                    </div>
                    <div className="hidden xs:flex flex-wrap gap-[1px] mt-1 max-w-[256px] max-h-[17px] overflow-hidden">
                        {tags.map(({name}, index) => (
                            <span key={index} className={'text-[10px] text-violet-500 rounded dark:text-violet-400 px-1 py-0 border '+
                                'border-violet-300 whitespace-nowrap dark:border-violet-600 bg-violet-100 dark:bg-violet-900'}>
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="hidden xl:flex items-center justify-start">
                    <span className={classNames("text-xs", nda ? "text-red-600":"text-green-600")}>NDA</span>
                    {nda ? (
                        <ShieldExclamationIcon className="h-5 w-5 text-red-600"/>
                    ):(
                        <ShieldCheckIcon className="h-5 w-5 text-green-600"/>
                    )}
                </div>
                <div className="hidden xl:block truncate text-slate-600 dark:text-slate-500">
                    {short_description}
                </div>
                <div className="flex flex-col xs:flex-row items-center justify-between gap-1 xs:gap-2">
                    <EditButton id={id} routeName={'projects.edit'}/>
                    <DeleteButton id={id} routeName={'projects.destroy'} className={'py-2 px-4 text-white bg-red-500 hover:bg-red-800 rounded-md'}/>
                </div>
            </div>
        ))
    );
}