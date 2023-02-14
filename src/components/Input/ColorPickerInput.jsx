import React from 'react'

const ColorPickerInput = ({ containerStyle, labelTitle, labelStyle, name, register }) => {
    return (
        <>
            <div className={`form-control w-full ${containerStyle}`}>
                {labelTitle && (
                    <label className="label">
                        <span className={`label-text ${labelStyle}`}>{labelTitle}</span>
                    </label>
                )}



                <input
                    type="color"
                    value={pickColor}
                    onChange={colorHandler}
                    className="hidden"

                    {...register(name, { required: false })}
                />

            </div>
        </>
    )
}

export default ColorPickerInput