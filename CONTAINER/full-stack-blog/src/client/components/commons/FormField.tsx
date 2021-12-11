/** @format */

import * as React from 'react'

interface IFormFieldProps {
    state: [string, (s: string) => void]
    name: string
    pattern?: string
    invalidMessage?: string
    type?: 'text' | 'password' | 'email' | 'textarea'
    transform?: (s: string) => string
}

const FormField: React.FC<
    IFormFieldProps & Partial<React.HTMLProps<HTMLInputElement | HTMLTextAreaElement>>
> = ({
    state,
    name,
    pattern,
    invalidMessage = 'Please enter a valid input',
    type = 'text',
    transform = (s) => s,
    ...slices
}) => {
    const [val, setVal] = state
    const inputId = name.split(' ').join('-')

    let fieldRef = React.useRef<HTMLInputElement & HTMLTextAreaElement>()

    const edited = React.useRef(false)
    const [validityError, setValidityError] = React.useState('')

    React.useEffect(() => {
        if (edited.current && !fieldRef.current.checkValidity()) {
            setValidityError(invalidMessage)
        } else {
            setValidityError('')
        }
    }, [fieldRef.current])

    const handleChange: React.ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement> = () => {
        edited.current = true
        setVal(transform(fieldRef.current.value))
        setValidityError('')
    }

    const handleBlur: React.FocusEventHandler<HTMLInputElement & HTMLTextAreaElement> = () => {
        if (!fieldRef.current.checkValidity()) {
            setValidityError(invalidMessage)
        }
    }

    return (
        <div className="form-group m-3">
            <label htmlFor={inputId}>
                {name} {slices.required && <span className="text-danger">*</span>}
            </label>
            {type === 'textarea' ? (
                <textarea
                    {...slices}
                    placeholder={slices.placeholder || name}
                    ref={fieldRef}
                    id={inputId}
                    cols={30}
                    rows={10}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={val}
                />
            ) : (
                <input
                    {...slices}
                    placeholder={slices.placeholder || name}
                    ref={fieldRef}
                    type={type}
                    id={inputId}
                    className="form-control"
                    value={val}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    pattern={pattern}
                ></input>
            )}
            {validityError && <p style={{ color: 'red' }}>{validityError}</p>}
        </div>
    )
}

export default FormField
