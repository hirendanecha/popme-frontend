import React from 'react'

const Button = ({ buttonClass, text, rightIcon, type = "button" }) => {
    return (
        <>
            <button type={type} className={`btn bg-secondary-main border-0 hover:bg-secondary-main capitalize text-white gap-2 ${buttonClass}`}>
                {rightIcon && rightIcon}

                {text}
            </button>
        </>
    )
}

export default Button