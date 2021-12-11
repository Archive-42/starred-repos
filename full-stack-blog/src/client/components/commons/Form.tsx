/** @format */

import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

interface IFormProps extends RouteComponentProps {
    submitText: string
    action?: (...args: any[]) => void
    cancel?: (...args: any[]) => void
    className?: string
}

const Form: React.FC<IFormProps> = ({
    children,
    submitText,
    action,
    cancel,
    history,
    className,
}) => {
    if (!className) {
        className = 'col-lg-6 col-md-8 border rounded'
    }

    if (!cancel) {
        cancel = () => history.goBack()
    }

    const handleClick: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (action) {
            action()
        }
    }

    return (
        <form className={className}>
            {children}
            <div className="d-flex">
                <button onClick={handleClick} className="m-3 ml-auto btn btn-primary">
                    {submitText}
                </button>
                <button className="m-3 btn btn-secondary" type="button" onClick={cancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default withRouter(Form)
