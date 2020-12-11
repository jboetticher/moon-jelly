import React from 'react'
import '../../styles/Form.css';

const Form = ({ title, description, children, ...props }) => (
    <form className={"form"} {...props}>
        <header className={"formHeader"}>
            <h1 className={"formTitle"}>{title}</h1>
            <p className={"formDescription"}>{description}</p>
        </header>

        {children}
    </form>
)

export default Form
