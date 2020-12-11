import cx from 'classnames'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Help from './Help'
import '../../styles/Form.css';
import Label from './Label'
import Row from './Row'

const Tag = ({ ...props }) => {
    if (props.tag && props.tag === 'select') {
        return <select className={"select"} {...props} />
    } else if (props.tag && props.tag === 'textarea') {
        return <textarea className={"input"} {...props} />
    } else {
        return <input className={"input"} {...props} />
    }
}

export default class Input extends PureComponent {
    state = { isFocused: false }

    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        help: PropTypes.string,
        tag: PropTypes.string,
        type: PropTypes.string,
        small: PropTypes.bool,
        options: PropTypes.object,
        additionalComponent: PropTypes.any
    }

    inputWrapClasses() {
        if (this.state.isFocused) {
            return cx("inputWrap", "isFocused")
        } else {
            return "inputWrap"
        }
    }

    toggleFocus = () => {
        this.setState({ isFocused: !this.state.isFocused })
    }

    render() {
        const {
            name,
            label,
            required,
            type,
            help,
            small,
            tag,
            additionalComponent,
            children,
            options,
            ...props
        } = this.props

        return (
            <Row>
                <Label htmlFor={name} required={required}>
                    {label}
                </Label>

                {type === 'radio' || type === 'checkbox' ? (
                    <div className={"radioGroup"}>
                        {options &&
                            options.map((option, index) => (
                                <div className={"radioWrap"} key={index}>
                                    <input
                                        className={"radio"}
                                        type={this.props.type}
                                        id={option.value}
                                        name={this.props.name}
                                        value={option.value}
                                    />
                                    <label
                                        className={"radioLabel"}
                                        htmlFor={option.value}
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className={this.inputWrapClasses()}>
                        <Tag
                            id={name}
                            name={name}
                            required={required}
                            type={type}
                            {...props}
                            onFocus={this.toggleFocus}
                            onBlur={this.toggleFocus}
                        >
                            {tag === 'select'
                                ? options &&
                                  options.map((option, index) => (
                                      <option key={index} value={option.value}>
                                          {option.label}
                                      </option>
                                  ))
                                : children}
                        </Tag>
                    </div>
                )}

                {help && <Help>{help}</Help>}

                {additionalComponent && additionalComponent}
            </Row>
        )
    }
}
