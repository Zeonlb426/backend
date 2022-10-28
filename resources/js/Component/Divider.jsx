import React from 'react';

export default function Divider({ children }) {
    return (
        <div className="w-full border-b border-slate-300 dark:border-slate-600 my-12 relative">
            <span className="absolute -top-[13px] pr-7 bg-white dark:bg-slate-800 tracking-wide text-base text-slate-300 dark:text-slate-600">
                {children}
            </span>
        </div>
    );
}
