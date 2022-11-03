import React, {useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {usePage, InertiaLink} from "@inertiajs/inertia-react";
import HeaderPage from "@/Blocks/HeaderPage";
import CreateButton from "@/Component/CreateButton";
import {CheckIcon, MinusIcon, Squares2X2Icon, Bars4Icon, XCircleIcon, CheckCircleIcon, ShieldCheckIcon, ShieldExclamationIcon} from "@heroicons/react/24/outline";
import DeleteButton from "@/Component/DeleteButton";
import EditButton from "@/Component/EditButton";
import Pagination from "@/Component/Pagination";
import ListViewProjects from '@/Blocks/ListViewProjects';
import GridViewProjects from '@/Blocks/GridViewProjects';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ProjectsList = (props) => {

    const [selected, setSelected] = useState({selections: []});
    const { projects, technologiesList, tagsList } = usePage().props;
    const { data, meta: {links} } = projects;
    const [view, setView] = useState(localStorage.view ? localStorage.view : 'list');

    const handleSelectedAll = () => {
        if (!selected.selections.length) {
            let sel = [];
            data.forEach( ({id}) => sel.push(id));
            setSelected({selections: sel});
        }else {
            setSelected({selections: []});
        }
    };

    const handleView = () => {
        if (view === 'list') {
            setView('grid');
            localStorage.setItem('view', 'grid');
        }else{
            setView('list');
            localStorage.setItem('view', 'list');
        }
    }

    return (
        <div className="max-w-screen-2xl mx-auto bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
            <HeaderPage title={'Project'} subTitle={'List'} description={'List of Projects'}>
                <CreateButton routeName={'projects.create'} title={'Project'}/>
            </HeaderPage>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4 justify-start">
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
                        routeName={'projects.destroy'}
                        className={'flex items-center gap-1 text-xs py-1 px-2 ' +
                        'text-red-500 dark:text-red-400 disabled:text-slate-300 disabled:dark:text-slate-500 ' +
                        'border border-red-500 disabled:border-slate-300 dark:border-red-400 disabled:dark:border-slate-500 ' +
                        'hover:bg-red-200 dark:hover:bg-red-900 disabled:hover:bg-transparent ' +
                        'rounded-md transition ease-in-out duration-150'}
                    >
                        Selected
                    </DeleteButton>
                </div>
                <div className="flex items-center gap-4 justify-end">
                    <button
                        className={"flex items-center gap-1 py-1 px-2 bg-slate-100 dark:bg-slate-900 text-slate-900 " +
                        "dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300  " +
                        "dark:border-slate-600 rounded-md transition ease-in-out duration-150 relative"}
                        type="button"
                        onClick={handleView}
                    >
                        {view === 'list' ? (
                            <>
                                <Squares2X2Icon className="h-4 w-4 mx-auto"/>
                                <span className="text-xs font-thin">View</span>
                            </>
                        ):(
                            <>
                                <Bars4Icon className="h-4 w-4 mx-auto"/>
                                <span className="text-xs font-thin">View</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {data.length > 0 ? (

                view === 'list' ?
                    <ListViewProjects key={'list'} data={data} setSelected={setSelected} selected={selected} /> 
                :
                    <GridViewProjects key={'grid'} data={data} setSelected={setSelected} selected={selected} />
            ) : (
                <div
                    className="flex h-56 justify-center items-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100">
                    Projects list is empty
                </div>
            )}
            <Pagination links={links}/>
        </div>
    );
}

ProjectsList.layout = page => <Authenticated children={page} title="Projects List"/>

export default ProjectsList
