import React, {useState, Fragment, useCallback, useRef, useEffect} from 'react';
import {usePage, useForm, InertiaLink} from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import { Tab, Listbox, Transition  } from '@headlessui/react'
import TitlePage from "@/Component/TitlePage";
import ListButton from "@/Component/ListButton";
import SaveButton from "@/Component/SaveButton";
import Switcher from "@/Component/Switcher";
import Dropzone from "@/Component/Dropzone";
import {PhotoIcon, FilmIcon, TrashIcon, PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Input from "@/Component/Input";
import Divider from "@/Component/Divider";
import TextArea from "@/Component/TextArea";
import MultiSelect from "@/Component/MultiSelect";
import DynamicInput from "@/Component/DynamicInput";
import Dropdown from "@/Components/Dropdown";
import {selectRatio} from '@/config/Navigation';
import Select from "@/Component/Select";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProjectsCreate = (props) => {
    const { technologiesList, tagsList } = usePage().props;

    const { data, setData, errors, post, processing } = useForm({
        nda: false,
        title: '',
        sub_title: '',
        description: '',
        short_description: '',
        award: [],
        feature: [],
        team: [],
        term: [],
        image_case:  null,
        show_case: false,
        sort_case: 0,
        image_award:  null,
        show_award: false,
        sort_award: 0,
        aspect_ratio: '1X1',
        image_project:  null,
        show_project: false,
        sort_project: 0,
        url_web: '',
        url_ios: '',
        url_android: '',
        technologies: [],
        tags: [],
        gallery: [],
        _method: 'post'
    });

    const tabs = [
        {
            name:'General',
            fields:['title', 'sub_title', 'description', 'short_description']
        },
        {
            name:'Links',
            fields:['url_web', 'url_ios', 'url_android']
        },
        {
            name:'Information',
            fields:['features', 'team', 'terms']
        },
        {
            name:'Cases',
            fields:['image_case', 'sort_case']
        },
        {
            name:'Projects',
            fields:['image_project', 'sort_project']
        },
        {
            name:'Awards',
            fields:['image_award', 'sort_award']
        },
        {
            name:'Gallery',
            fields:['gallery'],
            isError: false
        }];


    const galleryImagesRef = useRef(null);
    const [GalleryList, setGalleryList] = useState(data.gallery);
    const [inputVideo, setInputVideo] = useState('');
    const [errorVideo, setErrorVideo] = useState(null);

    const [isDragging, setIsDragging] = useState(false);
    const [indexDraggedItem, setIndexDraggedItem] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);

    const clearError = (name) => {
        delete errors[name];
    }



    // console.log([...tabs[0].fields, ...Object.keys(errors)])
    // console.log([...new Set([...tabs[0].fields, ...Object.keys(errors)])])
    // console.log([...tabs[0].fields, ...Object.keys(errors)].length === [...new Set([...tabs[0].fields, ...Object.keys(errors)])].length)



    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    }

    const handleChange = (e) => {
        clearError(e.target.name);
        setData(data => ({
            ...data,
            [e.target.name]: e.target.value,
        }))
    }

    const handleChangeBlock = (e, name, index) => {
        data[name][index] = e.target.value
        setData((data) => ({
            ...data,
            [name]: [...data[name]],
        }))
    }

    const addElement = (name, body) => {
        setData((data) => ({
            ...data,
            [name]: [...data[name], body],
        }))
    }

    const removeElement = (name, id) => {
        let finalArray = data[name].filter((element, index) => index !== id );
        if (finalArray.length === 0 && name === 'award'){
            setData(values => ({...values, ['image_award']: null, ['show_award']: false, ['sort_award']: 0}))
        }
        setData((data) => ({
            ...data,
            [name]: finalArray,
        }))
    }

    const removeImage = (name) => {
        clearError(name);
        setData((data) => ({
            ...data,
            [name]: null,
        }))
    }

    const onDrop = (acceptedFiles, name) => {
        clearError(name);
        setData((data) => ({
            ...data,
            ['image_case']: acceptedFiles[0],
        }))
    }

    const handleMultiSelect = ( elements, name ) => {
        setData((data) => ({
            ...data,
            [name]: elements,
        }))
    }

    const handleChangeAward = (e, id) => {
        data.award[id][e.target.name] = e.target.value
        setData((data) => ({
            ...data,
            ['award']: [...data.award],
        }))
    }

    const addImagesToGallery = (e) => {
        Object.values(e.target.files).map(item => {
            item['image'] = URL.createObjectURL(item)
            item['sort'] = 0
        })
        let temp = [...GalleryList.concat(Object.values(e.target.files))]
        temp.map((item, idx) => item['sort'] = idx)
        setGalleryList(temp)
    }
    const addVideoToGallery = () => {
        if (inputVideo !== '' && inputVideo.startsWith('https://vimeo.com/')) {
            fetch("https://vimeo.com/api/oembed.json?url="+ inputVideo)
                .then(response => {
                    if(response.ok) return response.json()
                    return response.text().then(text => {throw new Error(text)})
                })
                .then(
                    (result) => {
                        let temp = [...GalleryList.concat({
                            'sort': 0,
                            'video': inputVideo,
                            'image': result.thumbnail_url_with_play_button,
                            'thumbnail':result.thumbnail_url,
                            'type': 'video',
                        })]
                        temp.map((item, idx) => item['sort'] = idx)
                        setGalleryList(temp)
                        setInputVideo('');
                    },
                    (error) => {
                        setInputVideo('');
                        setErrorVideo('Video not found, please check the correct link');
                    }
                )
        }else {
            setErrorVideo('Link must be to Vimeo video');
            setInputVideo('');
        }
    }

    const onDragStartHandler = (e, index) => {
        setIsDragging(true);
        e.dataTransfer.effectAllowed = "move";
        e.target.style.opacity = 0.3;
        setIndexDraggedItem(index);
        setDraggedItem(GalleryList[index]);
    }
    const onDragEndHandler = (e) => {
        setIsDragging(false);
        e.target.style.opacity = 1;
        setIndexDraggedItem(null);
        setDraggedItem(null);
    }
    const onDragOverElementHandler = (e, item, index) => {
        e.preventDefault();
        if (index === indexDraggedItem) return
        let position = index;
        if (e.nativeEvent.offsetX >= (e.target.offsetWidth / 2)) {
            position = index + 1;
        }
        let temp = [...GalleryList.filter((item) => item.sort !== draggedItem.sort)];
        temp.splice(position, 0, draggedItem);
        temp.map((item, idx) => item['sort'] = idx)
        setGalleryList(temp);

    }
    const removeItemGallery = (index) => {
        let temp = GalleryList.filter((item, idx) => idx !== index);
        temp.map((item, idx) => item['sort'] = idx)
        setGalleryList(temp);
    }


    // useEffect(() => {
    //     console.log(errors)
    // }, [errors]);



    // useEffect(() => {
    //     if (data.award.length === 0){
    //         setData(values => ({...values, ['image_award']: null, ['show_award']: false, ['sort_award']: 0}))
    //     }
    // }, [data.award]);
    //
    // useEffect(() => {
    //     if (GalleryList.length > 0){
    //         setData(values => ({...values, ['gallery']: GalleryList}))
    //     }else {
    //         setData(values => ({...values, ['gallery']: []}))
    //     }
    // }, [GalleryList]);
return (
    <div className="max-w-screen-2xl min-h-[calc(100vh_-_144px)] flex flex-col mx-auto bg-white dark:bg-slate-800 shadow-sm sm:rounded-lg p-4 sm:p-6">
        <form onSubmit={e => handleSubmit(e)} className={'block flex grow flex-col justify-between'}>
            <div className={'w-full'}>
                <div className="flex items-center justify-between mb-6">
                    <TitlePage title={'Project'} subTitle={'Create'} description={'Creating a new Project'}/>
                    <div className="flex gap-2 items-center">
                        <ListButton routeName={'projects.index'}/>
                        <SaveButton processing={processing}/>
                    </div>
                </div>
                <Tab.Group selectedIndex={1}>
                    <Tab.List className={'flex gap-1 rounded-md bg-slate-100 dark:bg-slate-900 p-1 justify-between'}>
                        {tabs.map( (tab, index) =>
                            <Tab key={index} className = { ({ selected }) =>
                                classNames('w-full relative rounded-md py-2.5 text-sm font-medium leading-5 text-slate-700',
                                    'ring-white ring-opacity-50 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2',
                                    selected ? 'bg-white dark:bg-slate-600 dark:text-slate-100 shadow'
                                    : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200'
                                )
                            }>
                                {tab.name}
                                { [...tab.fields, ...Object.keys(errors)].length !== [...new Set([...tab.fields, ...Object.keys(errors)])].length &&  <span className={'absolute top-0 right-0 text-red-600'}>gggg</span>}
                            </Tab>
                        )}
                    </Tab.List>
                    <Tab.Panels >
                    {/*-------TAB GENERAL-------*/}
                    <Tab.Panel className="mt-4">
                        <Switcher title={'NDA'} clarification={'(Non disclosure)'} checked={data.nda} name={'nda'} setData={setData}/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Input name="title" value={data.title} handleChange={handleChange} required={true} label='Title:' error={errors.title}/>
                            <Input name="sub_title" value={data.sub_title} handleChange={handleChange} required={true} label='Sub title:' error={errors.sub_title}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <TextArea name="description" value={data.description} label="Description:" required={true} handleChange={handleChange} error={errors.description}/>
                            <TextArea name="short_description" value={data.short_description} label="Short description:" handleChange={handleChange} error={errors.short_description}/>
                        </div>
                        <div className={'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'}>
                            <MultiSelect
                                name={'technologies'} handleMultiSelect={handleMultiSelect} placeholder="Select technologies..."
                                value={data.technologies} options={technologiesList.data} label={'Technologies list:'}
                            />
                            <MultiSelect
                                name={'tags'} handleMultiSelect={handleMultiSelect} placeholder="Select tags..."
                                value={data.tags} options={tagsList.data} label={'Tags list:'}
                            />
                        </div>
                    </Tab.Panel>
                    {/*-------TAB LINKS-------*/}
                    <Tab.Panel className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                            <Input name="url_web" value={data.url_web} handleChange={handleChange} label='Link Web' error={errors.url_web}/>
                            <Input name="url_ios" value={data.url_ios} handleChange={handleChange} label='Link AppStore' error={errors.url_ios}/>
                            <Input name="url_android" value={data.url_android} handleChange={handleChange} label='Link GooglePlay' error={errors.url_android}/>
                        </div>
                    </Tab.Panel >
                    {/*-------TAB INFORMATION-------*/}
                    <Tab.Panel className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 mb-6">
                            <DynamicInput label={'Features project:'} name={'feature'} data={data.feature} handleChangeBlock={handleChangeBlock} removeElement={removeElement} addElement={addElement}/>
                            <DynamicInput label={'Team:'} name={'team'} data={data.team} handleChangeBlock={handleChangeBlock} removeElement={removeElement} addElement={addElement}/>
                            <DynamicInput label={'Terms:'} name={'term'} data={data.term} handleChangeBlock={handleChangeBlock} removeElement={removeElement} addElement={addElement}/>
                        </div>
                    </Tab.Panel>
                    {/*-------TAB CASES-------*/}
                    <Tab.Panel className="mt-4">
                        <Switcher title={'Show'} clarification={'(in "Cases" section on website)'} checked={data.show_case} name={'show_case'} setData={setData}/>
                        <div className={"grid grid-cols-1 md:grid-cols-[320px_240px] gap-6"}>
                            <div className="relative">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Image for section "Cases":</p>
                                <Dropzone onDrop={(file) => (onDrop(file, 'image_case'))}
                                          accept={"image/*"}
                                          image={data.image_case}
                                          error={errors.image_case}
                                          name="image_case"
                                          classNameLabel={'p-2 w-60 xs:w-80 h-auto'}
                                />
                                {data.image_case ? (
                                    <button
                                        className={"absolute -right-[5px] top-[15px] p-2 rounded-md bg-red-500 hover:bg-red-600"}
                                        type="button"
                                        onClick={(e) => removeImage('image_case')}>
                                        <XMarkIcon className="h-4 w-4 text-white mx-auto"/>
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <Input type={'number'}
                                   name="sort_case"
                                   value={data.sort_case}
                                   handleChange={handleChange}
                                   required={false}
                                   label='Sorting:'
                                   error={errors.sort_case}
                                   min={0}
                                   max={1000}
                            />
                        </div>
                    </Tab.Panel>
                    {/*-------TAB PROJECTS-------*/}
                    <Tab.Panel className="mt-4">
                        <Switcher title={'Show'} clarification={'(in "Projects" section on website)'} checked={data.show_project} name={'show_project'} setData={setData}/>
                        <div className={"grid grid-cols-1 md:grid-cols-[320px_240px] gap-6"}>
                            <div className="relative">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Image for section "Projects":</p>
                                <Dropzone onDrop={(file) => (onDrop(file, 'image_project'))}
                                          accept={"image/*"}
                                          image={data.image_project}
                                          error={errors.image_project}
                                          name="image_case"
                                          classNameLabel={'p-4 w-60 xs:w-80 h-auto'}
                                />
                                {data.image_project ? (
                                    <button
                                        className={"absolute -right-[5px] top-[15px] p-2 rounded-md bg-red-500 hover:bg-red-600"}
                                        type="button"
                                        onClick={(e) => removeImage('image_project')}>
                                        <XMarkIcon className="h-4 w-4 text-white mx-auto"/>
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className={'w-full grid gap-6'}>
                                <Select
                                    name={'aspect_ratio'}
                                    handleSelect={handleMultiSelect}
                                    placeholder="Select aspect ratio..."
                                    value={data.aspect_ratio}
                                    options={selectRatio}
                                    label={'Aspect ratio:'}
                                />
                                <Input
                                    type={'number'}
                                    name="sort_project"
                                    value={data.sort_project}
                                    handleChange={handleChange}
                                    required={false}
                                    label='Sorting:'
                                    error={errors.sort_project}
                                    min={0}
                                    max={1000}
                                />
                            </div>
                        </div>
                    </Tab.Panel>
                    {/*-------TAB AWARDS-------*/}
                    <Tab.Panel className="mt-4">
                        <div className="w-full mb-6">
                            {data.award.length > 0 ? (
                                <>
                                    <Switcher title={'Show'} clarification={'(in "Awards" section on website)'} checked={data.show_award} name={'show_award'} setData={setData}/>
                                    <div className={"grid grid-cols-1 md:grid-cols-[320px_240px] gap-6"}>
                                        <div className="relative">
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Image for section "Awards":</p>
                                            <Dropzone onDrop={(file) => (onDrop(file, 'image_award'))}
                                                      accept={"image/*"}
                                                      image={data.image_award}
                                                      error={errors}
                                                      name="image_case"
                                                      classNameLabel={'p-4 w-60 xs:w-80 h-auto'}
                                            />
                                            {data.image_award ? (
                                                <button
                                                    className={"absolute -right-[5px] top-[15px] p-2 rounded-md bg-red-500 hover:bg-red-600"}
                                                    type="button"
                                                    onClick={(e) => removeImage('image_award')}>
                                                    <XMarkIcon className="h-4 w-4 text-white mx-auto"/>
                                                </button>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div className={'w-full grid gap-6'}>
                                            <Input
                                                type={'number'}
                                                name="sort_award"
                                                value={data.sort_award}
                                                handleChange={handleChange}
                                                required={false}
                                                label='Sorting:'
                                                error={errors.sort_award}
                                                min={0}
                                                max={1000}
                                            />
                                        </div>
                                    </div>
                                    {data.award.map((item, index) => (
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
                                                    <label htmlFor={"name"} className={`relative text-sm font-bold text-slate-700 dark:text-slate-300 `}>
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
                                                    <label htmlFor={"name"} className={`relative text-sm font-bold text-slate-700 dark:text-slate-300 `}>
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
                                                    <label htmlFor={"name"} className={`relative text-sm font-bold text-slate-700 dark:text-slate-300 `}>
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
                                                <button className="mt-[24px] px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md " type="button" onClick={(e) => removeElement('award', index)}>
                                                    <TrashIcon className="h-4 w-4 text-white mx-auto"/>
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div
                                    className={"flex h-40 rounded-md justify-center items-center bg-slate-100 " +
                                    "dark:bg-slate-700 text-slate-700 dark:text-slate-100"}
                                >
                                    This project has no AWARDS yet
                                </div>
                            )}
                            <div className="flex justify-end">
                                <button className={"group w-full mt-4 xs:w-auto rounded-md flex gap-1 items-center px-4 py-2 bg-slate-100 dark:bg-slate-900 " +
                                "text-slate-700 dark:text-slate-100 hover:text-white hover:bg-slate-700 border border-slate-300  " +
                                "dark:border-slate-600 rounded-md transition ease-in-out duration-150"}
                                        type="button"
                                        onClick={(e) => addElement('award', { name: '', nomination: '', date: '', url: '' })}>
                                    <PlusIcon className="h-5 w-5 text-slate-700 dark:text-slate-100 mx-auto group-hover:text-white"/>
                                    <span className="hidden sm:inline text-sm mt-[2px]">Add Award</span>
                                </button>
                            </div>
                        </div>
                    </Tab.Panel>
                    {/*-------TAB GALLERY-------*/}
                    <Tab.Panel className="mt-4">
                        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                            <div className="flex items-end">
                                <button
                                    className={"group text-sm flex items-center justify-center px-4 py-2 " +
                                    "hover:text-white bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-100 " +
                                    "hover:text-white hover:bg-slate-700 border border-slate-300  dark:border-slate-600 " +
                                    "rounded-md transition ease-in-out duration-150"}
                                    onClick={() => galleryImagesRef.current.click()}
                                    type="button"
                                >
                                    <PhotoIcon className="h-5 w-5 mr-1 group-hover:text-white"/>
                                    <span className={'mt-[2px]'}>Add Images</span>
                                </button>
                                <input ref={galleryImagesRef} name="gallery" type="file" multiple onChange={addImagesToGallery} hidden />
                            </div>
                            <div className={'relative'}>
                                <div className="grid grid-cols-[1fr_130px]">
                                    <Input
                                        className="w-full"
                                        classInput="rounded-none rounded-l-md placeholder:text-gray-300"
                                        name="gallery"
                                        value={inputVideo}
                                        handleChange={e => {
                                            setInputVideo(e.target.value);
                                            setErrorVideo(null);
                                        }}
                                        label='Link to Vimeo:'
                                        placeholder = 'Example: "https://vimeo.com/712760573"'
                                    />
                                    <button
                                        className={"group text-sm flex items-center mt-6 justify-center px-4 py-2 " +
                                        "hover:text-white bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-100 " +
                                        "hover:text-white hover:bg-slate-700 border border-slate-300  dark:border-slate-600 " +
                                        "rounded-r-md transition ease-in-out border-l-0 duration-150"}
                                        onClick={addVideoToGallery}
                                        type="button"
                                    >
                                        <FilmIcon className="h-5 w-5 mr-1 group-hover:text-white"/>
                                        <span className={'mt-[2px]'}>Add Video</span>
                                    </button>
                                </div>
                                {errorVideo && <div className="absolute bottom-0 left-0 translate-y-full text-red-600">{errorVideo}</div>}
                            </div>
                        </div>
                        <div className="flex text-sm font-bold text-slate-700 dark:text-slate-300">Sorting drag and drop:</div>
                        <div className="w-full mb-6 rounded-md border-2 border-slate-300 border-dashed pt-4" >
                            {GalleryList.length > 0 ? (
                                GalleryList.map((item, index) => {
                                    return <div
                                        key={index}
                                        className="p-2 m-3 border rounded-md inline-block relative hover:bg-slate-700 transition ease-in-out duration-150"
                                        draggable="true"
                                        onDragStart={(e) => onDragStartHandler(e, index)}
                                        onDragEnd={(e) => onDragEndHandler(e)}
                                        onDragOver={(e) => onDragOverElementHandler(e, item, index)}
                                    >
                                        <div style={{
                                            width: '100px',
                                            height: '100px',
                                            backgroundImage: 'url('+item.image+')',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            cursor: 'move',
                                        }}/>
                                        <button
                                            className="absolute -right-[5px] -top-[15px] p-2 rounded-md bg-red-500 hover:bg-red-600"
                                            type="button"
                                            onClick={() => removeItemGallery(index)}
                                        >
                                            <XMarkIcon className="h-4 w-4 text-white mx-auto"/>
                                        </button>
                                    </div>
                                })
                            ) : (
                                <div className="p-2 h-[169px] text-slate-700 dark:text-slate-300 grid justify-items-center content-center">
                                    Gallery is empty
                                    <span className="text-slate-400">Add an image or video</span>
                                </div>
                            )}
                        </div>
                    </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
            <div className={'w-full'}>
                <Divider/>
                <div className="flex justify-end mb-8">
                    <SaveButton processing={processing}/>
                </div>
            </div>
        </form>
    </div>
);
}

ProjectsCreate.layout = page => <Authenticated children={page} title="Projects List"/>

export default ProjectsCreate
