import React from 'react'
import '../../styles/Form.css';

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
