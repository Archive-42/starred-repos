/** @format */

import * as React from 'react'

export interface ISystemAlert {
    heading?: string
    content: string
    type?: 'success' | 'danger' | 'info' | 'warning'
    id?: string
    remove?: (e?: React.MouseEvent) => {}
}

const SystemAlert: React.FC<ISystemAlert> = ({
    heading,
    content,
    type = 'success',
    id,
    remove,
}) => {
    return (
        <div className={`alert alert-${type} alert-dismissible alert-fadein`} role="alert" id={id}>
            {heading && <h4 className="alert-heading">{heading}</h4>}
            <p className="my-0">{content}</p>
            <button role="button" className="close" aria-label="Close" onClick={remove}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default SystemAlert
