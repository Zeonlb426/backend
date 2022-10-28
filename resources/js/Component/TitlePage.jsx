import React from "react";

export default function TitlePage({ title, subTitle, description }) {
    return (
        <div>
            <div className="flex items-baseline text-slate-700 dark:text-slate-100">
                <h1 className="text-sm sm:text-lg font-bold uppercase tracking-widest">{title}</h1>
                <span className="hidden sm:inline ml-2">{subTitle}</span>
            </div>
            <div className="hidden sm:block text-xs text-slate-400 dark:text-slate-500 pr-4 max-w-[350px]">
                {description}
            </div>
        </div>
    );
}
