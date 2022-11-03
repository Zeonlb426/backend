import React from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Dropzone from "@/Component/Dropzone";

export default function DropImage({name, setData, errors, label, data, bgColor = 'transparent', classNameLabel}) {

    const onDrop = (acceptedFiles, name) => {
        errors[name] ? delete errors[name] : '';
        setData((data) => ({
            ...data,
            [name]: acceptedFiles[0],
        }))
    }

    const removeImage = (name) => {
        errors[name] ? delete errors[name] : '';
        setData((data) => ({
            ...data,
            [name]: null,
        }))
    }

    return (
        <div className="relative">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>
            <Dropzone onDrop={(file) => (onDrop(file, name))}
                    accept={"image/*"}
                    image={data[name]}
                    errors={errors}
                    name={name}
                    classNameLabel={classNameLabel}
                    bgColor={bgColor}
            />
            {data[name] ? (
                <button
                    className={"absolute -right-[5px] top-[15px] p-2 rounded-md bg-red-500 hover:bg-red-600"}
                    type="button"
                    onClick={(e) => removeImage(name)}>
                    <XMarkIcon className="h-4 w-4 text-white mx-auto"/>
                </button>
            ) : (
                <></>
            )}
        </div>
    );
}