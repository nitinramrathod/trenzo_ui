

import React, { ChangeEventHandler } from 'react'

interface InputProps {
    label?: string,
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined,
    placeholder?: string,
    rows?: number | undefined ,
    value?: string | number ,
    name?: string,
    error?: string
    noLabel?: boolean
}

const Textarea:React.FC<InputProps> = ({
    name= 'name',
    placeholder="Placeholder",
    value="",
    onChange,
    label = "Enter Name",
    error,
    noLabel = false,
    rows=5

}) => {
  return (
    <div className={`${noLabel ?'':'mb-5'}`}>
    {!noLabel && <label htmlFor={`${name}-input-id`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
    <textarea rows={rows} name={name} onChange={onChange} id={`${name}-input-id`} value={value} placeholder={placeholder}  className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-md  focus:border-blue-500 block w-full py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
     {error && <p className='text-red-400 text-[13px]'>{error}</p>}
  </div>
  )
}

export default Textarea