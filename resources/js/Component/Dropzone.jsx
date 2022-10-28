import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept, image, name, error, bgColor, classNameLabel }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    let image_url = '';

    if( image !== null) {
        switch (typeof image) {
            case "string":
                image_url = image;
                break;
            case "object":
                image_url = URL.createObjectURL(image);
                break;
            default:
                image = null;
        }
    }

    return (
        <div className="grid justify-center items-center">
            <label htmlFor={name}
                   {...getRootProps()}
                   className={'flex flex-col rounded-md overflow-hidden justify-center items-center ' +
                   'border border-slate-700 dark:border-slate-300 border-dashed cursor-pointer ' + classNameLabel }
                   style={{background: bgColor}}
            >
                {image ? (
                    <img className={'min-h-[100px] min-w-[100px] bg-slate-400'} src={image_url} alt={''} />
                ) : (
                    <div className="flex flex-col justify-center items-center text-center">
                        <svg className="w-8 h-8 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        {isDragActive ? (
                            <p className="text-slate-700 dark:text-slate-300">Release to download file here</p>
                        ) : (
                            <>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    <span className="font-semibold">Click</span><br/>or drag and drop
                                </p>
                                <p className="text-[10px] text-slate-700 dark:text-slate-300">
                                    SVG, PNG, JPG or GIF<br/> (Max. 1000x1000px)
                                </p>
                            </>
                        )}
                    </div>
                )}

                <input name={name} {...getInputProps()}/>
            </label>
            {error && <div className="text-red-600">{error}</div>}
        </div>
    );
};

export default Dropzone;
