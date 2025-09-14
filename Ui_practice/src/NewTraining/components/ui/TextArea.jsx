import React from 'react'

const TextArea = ({description , handleChange}) => {
  return (
     <textarea

        value={description}
        onChange={handleChange}
        className="
            w-full
            min-h-[150px] md:min-h-[250px]
            resize-y
            rounded-2xl
            border border-gray-300
            bg-white
            p-4
            text-sm md:text-base
            leading-6
            shadow-sm
            outline-none
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
            placeholder:text-gray-400
        "/>
  )
}

export default TextArea