import React, {useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {usePage} from "@inertiajs/inertia-react";
import HeaderPage from "@/Blocks/HeaderPage";
import CreateButton from "@/Component/CreateButton";
import {CheckIcon, MinusIcon} from "@heroicons/react/24/outline";
import DeleteButton from "@/Component/DeleteButton";
import EditButton from "@/Component/EditButton";
import Pagination from "@/Component/Pagination";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const TagsList = (props) => {

    const [selected, setSelected] = useState({selections: []});
    const {tags} = usePage().props;
    const { data, meta: {links} } = tags;

    const handleSelectedAll = () => {
        if (!selected.selections.length) {
            let sel = [];
            data.forEach( ({id}) => sel.push(id));
            setSelected({selections: sel});
        }else {
            setSelected({selections: []});
        }
    };

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
        <div className="max-w-screen-2xl mx-auto bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
            <HeaderPage title={'Tags'} subTitle={'List'} description={'List of tags participating in sets projects'}>
                <CreateButton routeName={'tags.create'} title={'Tag'}/>
            </HeaderPage>
            <div className="flex items-center gap-4 justify-start mb-2">
                <button
                    className={"flex items-center sm:w-[75px] py-1 px-2 bg-slate-100 dark:bg-slate-900 text-slate-900 " +
                    "dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300  " +
                    "dark:border-slate-600 rounded-md transition ease-in-out duration-150"}
                    type="button"
                    onClick={handleSelectedAll}
                >
                    {!selected.selections.length ? (
                        <>
                            <CheckIcon className="h-4 w-4 mx-auto"/>
                            <span className="hidden sm:inline ml-2 text-xs font-thin">Select</span>
                        </>
                    ):(
                        <>
                            <MinusIcon className="h-4 w-4 mx-auto"/>
                            <span className="hidden sm:inline ml-2 text-xs font-thin">Reset</span>
                        </>
                    )}
                </button>
                <DeleteButton
                    id={selected.selections}
                    disabled={!selected.selections.length}
                    routeName={'tags.destroy'}
                    className={'flex items-center gap-1 text-xs py-1 px-2 ' +
                    'text-red-500 dark:text-red-400 disabled:text-slate-300 disabled:dark:text-slate-500 ' +
                    'border border-red-500 disabled:border-slate-300 dark:border-red-400 disabled:dark:border-slate-500 ' +
                    'hover:bg-red-200 dark:hover:bg-red-900 disabled:hover:bg-transparent ' +
                    'rounded-md transition ease-in-out duration-150'}
                >
                    Selected
                </DeleteButton>
            </div>
            {data.length > 0 ? (
                data.map(({id, name, slug, bg_color, logo}) => (
                    <div key={id}
                         onClick={() => handleSelected(id)}
                         className={
                             classNames(
                                 "grid grid-cols-[16px_1fr_106px] sm:grid-cols-[16px_2fr_1fr_106px] " +
                                 "items-center justify-between px-2 py-1 gap-2 sm:gap-10 hover:bg-slate-100 " +
                                 "dark:hover:bg-slate-700 border-t border-slate-200 dark:border-slate-600",
                                 selected.selections.includes(id) ? ' bg-slate-100 dark:bg-slate-900 ' : ''
                             )}
                    >
                        <div className="w-4 h-4 flex items-center justify-center bg-slate-100 dark:bg-slate-900
                        text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 border
                        border-slate-300  dark:border-slate-600 rounded-md transition ease-in-out duration-150">
                            {selected.selections.includes(id) ? <CheckIcon className="h-4 w-4"/>:''}
                        </div>
                        <div className={"flex items-center gap-6 overflow-x-hidden"}>
                            {logo ? (
                                <div className={"w-8 h-8 p-1 flex border border-slate-300 dark:border-slate-500 " +
                                "items-center justify-center overflow-hidden rounded-md hidden " +
                                "sm:block"} style={{background: bg_color}}>
                                    <img className={"max-w-6 h-auto"} src={logo} />
                                </div>
                            ):(
                                <div className={"w-8 h-8 p-1 flex border border-slate-300 dark:border-slate-500 " +
                                "items-center justify-center overflow-hidden rounded-md hidden " +
                                "sm:block"} style={{background: bg_color}}>
                                    <span className={"block w-[22px] h-[22px] leading-[24px] rounded-full bg-slate-200 " +
                                    "dark:bg-slate-800 dark:text-slate-300 text-center"}>
                                        {name[0].toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="truncate text-slate-700 dark:text-slate-100 text-base">
                                {name}
                            </div>
                        </div>
                        <div className="truncate hidden sm:block text-slate-700 dark:text-slate-100">
                            {slug}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <EditButton id={id} routeName={'tags.edit'}/>
                            <DeleteButton
                                id={id}
                                routeName={'tags.destroy'}
                                className={'py-2 px-4 text-white bg-red-500 hover:bg-red-800 rounded-md'}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <div
                    className="flex h-56 justify-center items-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100">
                    Tags list is empty
                </div>
            )}
            <Pagination links={links}/>
        </div>
    );
}

TagsList.layout = page => <Authenticated children={page} title="Tags List"/>

export default TagsList
