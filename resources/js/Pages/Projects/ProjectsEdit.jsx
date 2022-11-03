import React, {useState, useRef, useEffect} from 'react';
import {usePage, useForm} from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import { Tab } from '@headlessui/react'
import ListButton from "@/Component/ListButton";
import SaveButton from "@/Component/SaveButton";
import Switcher from "@/Component/Switcher";
import {PhotoIcon, FilmIcon, PlusIcon, XMarkIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import Input from "@/Component/Input";
import Divider from "@/Component/Divider";
import TextArea from "@/Component/TextArea";
import MultiSelect from "@/Component/MultiSelect";
import DynamicInput from "@/Component/DynamicInput";
import {selectRatio} from '@/config/Navigation';
import Select from "@/Component/Select";
import HeaderPage from "@/Blocks/HeaderPage";
import Award from '@/Component/Award';
import DropImage from '@/Blocks/DropImage';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProjectsEdit = (props) => {

    const { project, technologiesList, tagsList } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        nda: project.data.nda || false,
        title: project.data.title || '',
        sub_title: project.data.sub_title || '',
        description: project.data.description || '',
        short_description: project.data.short_description || '',
        award: project.data.award || [],
        feature: project.data.feature || [],
        team: project.data.team || [],
        term: project.data.term || [],
        image_case:  project.data.image_case || null,
        show_case: project.data.show_case || false,
        sort_case: project.data.sort_case || 0,
        image_award:  project.data.image_award || null,
        show_award: project.data.show_award || false,
        sort_award: project.data.sort_award || 0,
        aspect_ratio: project.data.aspect_ratio || '1X1',
        image_project:  project.data.image_project || null,
        show_project: project.data.show_project || false,
        sort_project: project.data.sort_project || 0,
        url_web: project.data.url_web || '',
        url_ios: project.data.url_ios || '',
        url_android: project.data.url_android || '',
        technologies: technologiesList.data.filter( e => {
            for (let i = 0; i < project.data.technologies.length; i += 1) {
                if (e.id === project.data.technologies[i].id) return true;
            }
            return false;
        }) || [],
        tags: tagsList.data.filter( e => {
            for (let i = 0; i < project.data.tags.length; i += 1) {
                if (e.id === project.data.tags[i].id) return true;
            }
            return false;
        }) || [],
        gallery: project.data.gallery || [],
        _method: 'put'
    });


    const tabs = [
        {
            name:'General',
            isError: errors.title || errors.sub_title || errors.description || errors.short_description ? true : false,
        },
        {
            name:'Links',
            isError: errors.url_web || errors.url_ios || errors.url_android ? true : false,
        },
        {
            name:'Information',
            isError: errors.features || errors.team || errors.terms ? true : false,
        },
        {
            name:'Cases',
            isError: errors.image_case || errors.sort_case ? true : false,
        },
        {
            name:'Projects',
            isError: errors.image_project || errors.sort_project ? true : false,
        },
        {
            name:'Awards',
            isError: errors.image_award || errors.sort_award ? true : false,
        },
        {
            name:'Gallery',
            isError: errors.gallery ? true : false, // TODO validate array
        }
    ];

    const galleryImagesRef = useRef(null);
    const [GalleryList, setGalleryList] = useState(data.gallery);
    const [inputVideo, setInputVideo] = useState('');
    const [errorVideo, setErrorVideo] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [indexDraggedItem, setIndexDraggedItem] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.update', project.data.id));
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

    useEffect(() => {
        if (GalleryList.length > 0){
            setData(values => ({...values, ['gallery']: GalleryList}))
        }else {
            setData(values => ({...values, ['gallery']: []}))
        }
    }, [GalleryList]);

    return (
        <div className="max-w-screen-2xl min-h-[calc(100vh_-_144px)] flex flex-col mx-auto bg-white dark:bg-slate-800 shadow-sm sm:rounded-lg p-4 sm:p-6">
        <form onSubmit={e => handleSubmit(e)} className={'flex grow flex-col justify-between'}>
            <div className={'w-full'}>
                <HeaderPage title={'Project'} subTitle={'Create'} description={'Creating a new Project'}>
                    <ListButton routeName={'projects.index'}/>
                    <SaveButton processing={processing}/>
                </HeaderPage>
                <Tab.Group>
                    <Tab.List className={'flex gap-1 rounded-md bg-slate-100 dark:bg-slate-900 p-1 justify-between'}>
                        {tabs.map( (tab, index) =>
                            <Tab ref={tab.ref}  key={index} className = { ({ selected }) =>
                                classNames(
                                    'w-full border relative rounded-md py-2.5 text-sm font-medium leading-5 text-slate-700',
                                    'ring-white ring-opacity-50 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2',
                                    selected ? 'bg-white dark:bg-slate-600 dark:text-slate-100 shadow'
                                    : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200',
                                    tab.isError ? 'border-red-600 dark:border-red-600':''
                                )
                            }>
                                {tab.name}
                                {tab.isError &&  <span className={'absolute top-0 right-0 text-red-600'}><ExclamationTriangleIcon className="h-5 w-5"/></span>}
                            </Tab>
                        )}
                    </Tab.List>
                    <Tab.Panels >
                    {/*-------TAB GENERAL-------*/}
                    <Tab.Panel className="mt-4">
                        <Switcher title={'NDA'} clarification={'(Non disclosure)'} checked={data.nda} name={'nda'} setData={setData}/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Input name="title" value={data.title} setData={setData} required={true} label='Title:' errors={errors}/>
                            <Input name="sub_title" value={data.sub_title} setData={setData} required={true} label='Sub title:' errors={errors}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <TextArea name="description" value={data.description} setData={setData} required={true} label="Description:" errors={errors}/>
                            <TextArea name="short_description" value={data.short_description} setData={setData} label="Short description:" errors={errors}/>
                        </div>
                        <div className={'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'}>
                            <MultiSelect
                                name={'technologies'} setData={setData} placeholder="Select technologies..."
                                value={data.technologies} options={technologiesList.data} label={'Technologies list:'}
                            />
                            <MultiSelect
                                name={'tags'} setData={setData} placeholder="Select tags..."
                                value={data.tags} options={tagsList.data} label={'Tags list:'}
                            />
                        </div>
                    </Tab.Panel>
                    {/*-------TAB LINKS-------*/}
                    <Tab.Panel className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                            <Input name="url_web" value={data.url_web} setData={setData} label='Link Web' errors={errors}/>
                            <Input name="url_ios" value={data.url_ios} setData={setData} label='Link AppStore' errors={errors}/>
                            <Input name="url_android" value={data.url_android} setData={setData} label='Link GooglePlay' errors={errors}/>
                        </div>
                    </Tab.Panel >
                    {/*-------TAB INFORMATION-------*/}
                    <Tab.Panel className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 mb-6">
                            <DynamicInput name={'feature'} data={data} setData={setData} label={'Features project:'}/>
                            <DynamicInput name={'team'} data={data} setData={setData} label={'Team:'}/>
                            <DynamicInput name={'term'} data={data} setData={setData} label={'Terms:'}/>
                        </div>
                    </Tab.Panel>
                    {/*-------TAB CASES-------*/}
                    <Tab.Panel className="mt-4">
                        <Switcher title={'Show'} clarification={'(in "Cases" section on website)'} checked={data.show_case} name={'show_case'} setData={setData}/>
                        <div className={"grid grid-cols-1 md:grid-cols-[320px_240px] gap-6"}>
                            <DropImage name={'image_case'} label={'Image for section "Cases":'} setData={setData} data={data} errors={errors} classNameLabel={'p-4 w-60 xs:w-80 h-auto'}/>
                            <Input type={'number'} name="sort_case" value={data.sort_case} setData={setData} label='Sorting:' errors={errors} max={1000}/>
                        </div>
                    </Tab.Panel>
                    {/*-------TAB PROJECTS-------*/}
                    <Tab.Panel className="mt-4">
                        <Switcher title={'Show'} clarification={'(in "Projects" section on website)'} checked={data.show_project} name={'show_project'} setData={setData}/>
                        <div className={"grid grid-cols-1 md:grid-cols-[320px_240px] gap-6"}>
                            <DropImage name={'image_project'} label={'Image for section "Projects":'} setData={setData} data={data} errors={errors} classNameLabel={'p-4 w-60 xs:w-80 h-auto'}/>
                            <div className={'w-full grid gap-6'}>
                                <Select name={'aspect_ratio'} setData={setData} placeholder="Select aspect ratio..." value={data.aspect_ratio} options={selectRatio} label={'Aspect ratio:'}/>
                                <Input type={'number'} name="sort_project" value={data.sort_project} setData={setData} label='Sorting:' errors={errors} max={1000}/>
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
                                        <DropImage name={'image_award'} label={'Image for section "Awards":'} setData={setData} data={data} errors={errors} classNameLabel={'p-4 w-60 xs:w-80 h-auto'}/>
                                        <div className={'w-full grid gap-6'}>
                                            <Input type={'number'} name="sort_award" value={data.sort_award} setData={setData} label='Sorting:' errors={errors} max={1000}/>
                                        </div>
                                    </div>
                                    {data.award.map((item, index) => (
                                        <Award key={index} item={item} setData={setData} index={index} data={data}/>
                                    ))}
                                </>
                                ) : (
                                <div className={"flex h-40 rounded-md justify-center items-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100"}>
                                    This project has no AWARDS yet
                                </div>
                                )
                            }
                            <div className="flex justify-end">
                                <button 
                                    className={"group w-full mt-4 xs:w-auto rounded-md flex gap-1 items-center px-4 py-2 bg-slate-100 dark:bg-slate-900 " +
                                    "text-slate-700 dark:text-slate-100 hover:text-white hover:bg-slate-700 border border-slate-300  " +
                                    "dark:border-slate-600 rounded-md transition ease-in-out duration-150"}
                                    type="button"
                                    onClick={(e) => setData((data) => ({...data, ['award']: [...data['award'], { name: '', nomination: '', date: '', url: '' }]}))}
                                >
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
                                <div className="grid grid-cols-[1fr_56px] xs:grid-cols-[1fr_130px]">
                                    <div className={'w-full relative '}>
                                        <label htmlFor={'gallery'} className={'relative text-sm font-bold text-slate-700 dark:text-slate-300'}>
                                            Link to Vimeo:
                                        </label>
                                        <input
                                            type={'text'}
                                            name={'gallery'}
                                            value={inputVideo}
                                            className={'w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 ' +
                                            'shadow-sm dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 ' +
                                            'focus:ring-opacity-50 rounded-l-md placeholder:text-gray-300 dark:placeholder:text-gray-600' +
                                            `${errors['gallery'] ? 'border-red-600 dark:border-red-600':''}`}
                                            placeholder={'Example: "https://vimeo.com/712760573"'}
                                            onChange={(e) => {
                                                setInputVideo(e.target.value);
                                                setErrorVideo(null);
                                            }}
                                        />
                                        {errors['gallery'] && <div className="absolute bottom-0 left-0 translate-y-full text-red-600">{errors['gallery']}</div>}
                                    </div>
                                    <button
                                        className={"group text-sm flex items-center mt-6 justify-center px-4 py-2 " +
                                        "hover:text-white bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-100 " +
                                        "hover:text-white hover:bg-slate-700 border border-slate-300  dark:border-slate-600 " +
                                        "rounded-r-md transition ease-in-out border-l-0 duration-150"}
                                        onClick={addVideoToGallery}
                                        type="button"
                                    >
                                        <FilmIcon className="h-5 w-5 mr-1 group-hover:text-white"/>
                                        <span className={'hidden xs:inline mt-[2px]'}>Add Video</span>
                                    </button>
                                </div>
                                {errorVideo && <div className="absolute bottom-0 left-0 translate-y-full text-red-600">{errorVideo}</div>}
                            </div>
                        </div>
                        <div className="flex text-sm font-bold text-slate-700 dark:text-slate-300">Sorting drag and drop:</div>
                        <div className="w-full mb-6 rounded-md border-2 border-slate-300 border-dashed pt-4" >
                            {GalleryList.length > 0 ? (
                                GalleryList.map((item, index) => (
                                    <div
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
                                ))
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

ProjectsEdit.layout = page => <Authenticated children={page} title="Projects Edit"/>

export default ProjectsEdit
