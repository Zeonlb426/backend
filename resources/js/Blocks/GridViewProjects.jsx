import React from "react";
import {CheckIcon, ShieldCheckIcon, ShieldExclamationIcon} from "@heroicons/react/24/outline";
import DeleteButton from "@/Component/DeleteButton";
import EditButton from "@/Component/EditButton";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function GridViewProjects({ data, selected, setSelected }) {
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
        <div className={"grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6"}>
            {data.map(({ id, title, short_description, nda, sub_title, image_preview, technologies, tags }) => (
                <div key={id} onClick={() => handleSelected(id)}
                    className={classNames("grid gap-2 p-4 rounded-md grid-cols-1 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 border",
                    "border-slate-200 dark:border-slate-600 ", selected.selections.includes(id) ? ' bg-slate-100 dark:bg-slate-900 ' : '')}
                >
                    <div className={"flex items-center justify-between"}>
                        <div className="w-4 h-4 flex items-center justify-center bg-slate-100 dark:bg-slate-900
                            text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 border
                            border-slate-300  dark:border-slate-600 rounded-md transition ease-in-out duration-150"
                        >{selected.selections.includes(id) ? <CheckIcon className="h-4 w-4"/>:''}</div>
                        <div className="flex items-center justify-center gap-1">
                            <span className={classNames("text-xs", nda ? "text-red-600":"text-green-600")}>NDA</span>
                            {nda ? (
                                <ShieldExclamationIcon className="h-5 w-5 text-red-600"/>
                            ):(
                                <ShieldCheckIcon className="h-5 w-5 text-green-600"/>
                            )}
                        </div>
                    </div>

                    <div className="flex-none w-full h-[100px] relative">
                        <img src={image_preview} alt="" className="absolute rounded-md inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="grid">
                        <span className="text-slate-900 dark:text-slate-100 font-bold text-base lg:text-lg 2xl:text-xl truncate">{title}</span>
                        <span className="text-slate-400 dark:text-slate-500 text-sm sm:text-base truncate">{sub_title}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center justify-center">
                        <EditButton id={id} routeName={'projects.edit'}/>
                        <DeleteButton id={id} routeName={'projects.destroy'} className={'py-2 px-4 text-white bg-red-500 hover:bg-red-800 rounded-md'}/>
                    </div>
                </div>
            ))}
        </div> 
    );
}