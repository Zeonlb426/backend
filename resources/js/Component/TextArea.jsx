import React from 'react';

export function TextArea({
  rows = '6',
  name = '',
  classLabel = '',
  classTextarea = '',
  className = '',
  label = '',
  value = '',
  required = false,
  errors = null,
  setData,
}) {
    const handleChange = (e) => {
        errors[name] ? delete errors[name] : '';
        setData(data => ({
            ...data,
            [name]: e.target.value,
        }))
    }

    return (
        <div className={className}>
            <label htmlFor={name} className={`${!label && 'hidden'} relative text-sm font-bold text-slate-700 dark:text-slate-300` + classLabel}>
                {label} { required ?
                <span className="absolute flex gap-[2px] -top-[8px] right-0 translate-x-full text-red-600">
                    <span className="text-xl leading-none mt-[2px]">*</span>
                    <span className="hidden sm:block text-[10px]"> required</span>
                </span> : '' }
            </label>
            <textarea
                required={required}
                rows={rows}
                className={"min-h-[50px] dark:bg-slate-900 dark:text-white max-h-80 box-border " +
                "w-full border-slate-300 dark:border-slate-500 focus:border-indigo-300 " +
                "focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " +
                `${errors[name] ? 'border-red-600 dark:border-red-600':''}` + classTextarea}
                name={name} value={value}
                onChange={e => handleChange(e)}
            />
            {errors[name] && <div className="text-red-600">{errors[name]}</div>}
        </div>
    );
}

export default React.memo(TextArea)
