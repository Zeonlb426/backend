import React, {useContext, useEffect, useRef} from 'react';

export function Input({
    name = '',
    className = '',
    classLabel = '',
    classInput = '',
    label = '',
    value = '',
    required = false,
    type = 'text',
    placeholder = '',
    errors = null,
    isFocused,
    autoComplete,
    min = 0,
    max = 100,
    setData,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const handleChange = (e) => {
        errors[e.target.name] ? delete errors[e.target.name] : '';
        setData(data => ({
            ...data,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className={'w-full relative ' + className}>
            <label htmlFor={name} className={`${!label && 'hidden'} relative text-sm font-bold text-slate-700 dark:text-slate-300 ` + classLabel}>
                {label} { required ?
                <span className="absolute flex gap-[2px] -top-[8px] right-0 translate-x-full text-red-600">
                    <span className="text-xl leading-none mt-[2px]">*</span>
                    <span className="hidden sm:block text-[10px]"> required</span>
                </span> : '' }
            </label>
            <input
                type={type}
                name={name}
                value={value}
                className={'w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 ' +
                'shadow-sm dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 ' +
                'focus:ring-opacity-50 rounded-md ' +
                `${errors[name] ? 'border-red-600 dark:border-red-600':''}` + classInput}
                ref={input}
                max={max}
                min={min}
                autoComplete={autoComplete}
                required={required}
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
            />
            {errors[name] && <div className="absolute bottom-0 left-0 translate-y-full text-red-600">{errors[name]}</div>}
        </div>
    );
}

export default React.memo(Input)
