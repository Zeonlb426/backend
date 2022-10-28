import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import {XMarkIcon} from "@heroicons/react/24/outline";
import TitlePage from "@/Component/TitlePage";
import SaveButton from "@/Component/SaveButton";
import ListButton from "@/Component/ListButton";
import Input from "@/Component/Input";
import Dropzone from "@/Component/Dropzone";
import Divider from "@/Component/Divider";

const TechnologiesCreate = (props) => {
    const { data, setData, errors, post, processing } = useForm({
        name: '',
        order: 100,
        bg_color: '#FFFFFF',
        logo:  null,
        _method: 'post'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('technologies.store'));
    }

    const handleChange = (e) => {
        setData(data => ({
            ...data,
            [e.target.name]: e.target.value,
        }))
    }

    const removeImage = (name) => {
        setData((data) => ({
            ...data,
            [name]: null,
        }))
    }

    const onDrop = (acceptedFiles, name) => {
        setData((data) => ({
            ...data,
            [name]: acceptedFiles[0],
        }))
    }

    return (
        <div className="max-w-screen-2xl mx-auto bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
            <form onSubmit={ (e) => handleSubmit(e)}>
                <div className="flex items-center justify-between mb-6">
                    <TitlePage title={'Technologies'} subTitle={'Create'} description={'Creating a new Technology'}/>
                    <div className="flex gap-2 items-center">
                        <ListButton routeName={'technologies.index'}/>
                        <SaveButton processing={processing}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[128px_minmax(240px,_640px)_128px] gap-6 mb-6">
                    <div className={"w-32"}>
                        <div className="relative">
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Logo:</p>
                            <Dropzone onDrop={(file) => (onDrop(file, 'logo'))}
                                      accept={"image/*"}
                                      image={data.logo}
                                      error={errors}
                                      name="logo"
                                      bgColor={data.bg_color}
                                      classNameLabel={'p-2 w-32 h-32'}
                            />
                            {data.logo ? (
                                <button className="absolute -right-[5px] top-[15px] p-2 rounded-md bg-red-500 hover:bg-red-600" type="button" onClick={(e) => removeImage('logo')}>
                                    <XMarkIcon className="h-4 w-4 text-white mx-auto"/>
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className={'flex items-center justify-between mt-1'}>
                            <p className="text-sm text-slate-700 dark:text-slate-300">Change bg:</p>
                            <input type="color" name="bg_color" value={data.bg_color} onChange={e => handleChange(e)} />
                        </div>
                    </div>
                    <Input className={''}
                           classLabel={'text-sm text-slate-700 dark:text-slate-300'}
                           classInput={'w-full border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 ' +
                           'shadow-sm dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 ' +
                           'focus:ring-opacity-50 rounded-md'}
                           name="name"
                           value={data.name}
                           handleChange={handleChange}
                           required={true}
                           label='Name:'
                           error={errors.name}
                    />
                    <div className={"w-32"}>
                        <Input className={''}
                               classLabel={'text-sm text-slate-700 dark:text-slate-300'}
                               classInput={'w-full border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 ' +
                               'shadow-sm dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 ' +
                               'focus:ring-opacity-50 rounded-md'}
                               type={'number'}
                               name="order"
                               value={data.order}
                               handleChange={handleChange}
                               required={false}
                               label='Sorting:'
                               error={errors.order}
                               min={0}
                               max={1000}
                        />
                    </div>
                </div>
                <Divider/>
                <div className="flex justify-end mb-8">
                    <SaveButton processing={processing}/>
                </div>
            </form>
        </div>
    );
}

TechnologiesCreate.layout = page => <Authenticated children={page} title="Technologies Create"/>

export default TechnologiesCreate
