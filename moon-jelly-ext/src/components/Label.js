import React from 'react'

const Label = ({ required, children, ...props }) => (
    <label
        className={required ? "required" : "label"}
        title={required ? 'Required' : ''}
        {...props}
    >
        {children}
    </label>
)

export default Label
