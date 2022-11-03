import React from 'react';
import {useForm, usePage} from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import HeaderPage from "@/Blocks/HeaderPage";
import SaveButton from "@/Component/SaveButton";
import ListButton from "@/Component/ListButton";
import Input from "@/Component/Input";
import DropImage from '@/Blocks/DropImage';
import Divider from "@/Component/Divider";

const TechnologiesEdit = (props) => {
    const { technology } = usePage().props;

    const { data, setData, errors, post, processing } = useForm({
        id: technology.data.id || '',
        name: technology.data.name || '',
        order: technology.data.order || 100,
        bg_color: technology.data.bg_color || '#FFFFFF',
        logo: technology.data.logo || null,
        _method: 'put'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('technologies.update', technology.data.id));
    }

    const handleChange = (e) => {
        setData(data => ({
            ...data,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="max-w-screen-2xl mx-auto bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
            <form onSubmit={e => handleSubmit(e)}>
                <HeaderPage title={'Technologies'} subTitle={'Edit'} description={'Editing a Technology'}>
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
                    <div className={"w-full"}>
                        <input type='hidden'  name='id' value={data.id}/>
                        <Input name="name" value={data.name} setData={setData} label='Name:' errors={errors} required={true}/>
                    </div>
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

TechnologiesEdit.layout = page => <Authenticated children={page} title="Technologies Edit"/>

export default TechnologiesEdit

