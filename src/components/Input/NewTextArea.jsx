import React, { useState } from 'react'

const NewTextArea = ({ containerStyle, labelTitle, labelStyle, inputStyle, defaultValue, placeholder, updateFormValue, name, register }) => {

    const [value, setValue] = useState(defaultValue);


    const updateInputValue = (val) => {
        setValue(val)
        updateFormValue({ name, value: val })
    }

    return (
        <>
            <div className={`form-control w-full ${containerStyle}`}>
                {
                    labelTitle && (
                        <label className="label">
                            <span className={`label-text ${labelStyle}`}>{labelTitle}</span>
                        </label>
                    )
                }

                {
                    register ? (<>
                        <textarea className={`textarea textarea-bordered w-full text-primary-main bg-white focus:outline-none border-borderColor-main h-24 ${inputStyle}`} placeholder={placeholder || ""} {...register(name, { required: false })}></textarea>
                    </>) : (<>
                        <textarea className={`textarea textarea-bordered w-full text-primary-main bg-white focus:outline-none border-borderColor-main h-24 ${inputStyle}`} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)} value={value}></textarea>
                    </>)
                }


            </div >
        </>
    )
}

export default NewTextArea