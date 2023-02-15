import React from 'react'

const InputWithIcon = ({ containerStyle, labelTitle, labelStyle, leftIcon, rightIcon, type, placeholder, name, inputStyle, register }) => {
    return (
        <>
            <div className={`form-control w-full ${containerStyle}`}>
                {labelTitle && (
                    <label className="label">
                        <span className={`label-text ${labelStyle}`}>{labelTitle}</span>
                    </label>
                )}

                <label class="relative text-gray-400 focus-within:text-gray-600 block">
                    {
                        leftIcon && (
                            <span className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3">
                                {leftIcon}
                            </span>
                        )
                    }

                    <input type={type || "text"} placeholder={placeholder || ""} {...register(name, { required: false })} className={`form-input w-full bg-white text-primary-main text-base focus:outline-none border border-borderColor-main rounded-lg appearance-none block ${rightIcon ? "pr-14" : "pl-14"} py-[11px] px-4 ${inputStyle}`} />


                    {
                        rightIcon && (
                            <span className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 right-3">
                                {rightIcon}
                            </span>
                        )
                    }
                </label>
            </div>
        </>
    )
}

export default InputWithIcon