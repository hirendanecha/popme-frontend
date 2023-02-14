import React from 'react'

const InputWithIcon = ({ containerStyle, labelTitle, labelStyle, icon, type, placeholder, name, inputStyle, register }) => {
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
                        icon && (
                            <span className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3">
                                <div class="avatar placeholder">
                                    <div class="bg-[#EC407A] text-white text-xs rounded-full w-8">
                                        <span>MX</span>
                                    </div>
                                </div>
                            </span>
                        )
                    }

                    <input type={type || "text"} placeholder={placeholder || ""} {...register(name, { required: false })} className={`form-input w-full bg-white text-primary-main text-base focus:outline-none border border-borderColor-main rounded-lg appearance-none block pl-14 py-[11px] px-4 ${inputStyle}`} />
                </label>
            </div>
        </>
    )
}

export default InputWithIcon