import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import HeaderPage from "@/Blocks/HeaderPage";
import SaveButton from "@/Component/SaveButton";
import ListButton from "@/Component/ListButton";
import Input from "@/Component/Input";
import DropImage from '@/Blocks/DropImage';
import Divider from "@/Component/Divider";

const TechnologiesCreate = (props) => {
    const { data, setData, errors, post, processing } = useForm({
        name: '',
        order: 100,
        bg_color: 'transparent',
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

    return (
        <div className="max-w-screen-2xl mx-auto bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
            <form onSubmit={ (e) => handleSubmit(e)}>
                <HeaderPage title={'Technologies'} subTitle={'Create'} description={'Creating a new Technology'}>
                    <ListButton routeName={'technologies.index'}/>
                    <SaveButton processing={processing}/>
                </HeaderPage>
                <div className="grid grid-cols-1 sm:grid-cols-[128px_minmax(240px,_640px)_128px] gap-6 mb-6">
                    <div className={"w-32"}>
                        <DropImage name={'logo'} label={'Logo:'} setData={setData} data={data} errors={errors} bgColor={data.bg_color} classNameLabel={'p-2 w-32 h-32'}/>
                        <div className={'flex items-center justify-between mt-1'}>
                            <p className="text-sm text-slate-700 dark:text-slate-300">Change bg:</p>
                            <input type="color" name="bg_color" value={data.bg_color} onChange={e => handleChange(e)} />
                        </div>
                    </div>
                    <Input name="name" value={data.name} setData={setData} label='Name:' errors={errors} required={true}/>
                    <div className={"w-32"}>
                        <Input type={'number'} name="order" value={data.order} setData={setData} label='Sorting:' errors={errors} max={1000}/>
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
