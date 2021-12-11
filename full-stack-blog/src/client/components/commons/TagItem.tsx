/** @format */

import * as React from 'react'

interface ITagItem {
    text: string
    click?: (...args: any[]) => void
    remove?: (...args: any[]) => void
}

const TagItem: React.FC<ITagItem> = ({ text, click, remove }) => {
    const handleClick: React.MouseEventHandler<HTMLSpanElement> = () => {
        click()
    }

    let hover = click && {
        cursor: 'pointer',
    }

    click = click || (() => {})

    return (
        <span
            className="px-3 py-1 mx-2 my-1 text-nowrap border border-dark rounded-pill bg-light"
            style={{ ...hover, height: '2rem' }}
            onClick={handleClick}
        >
            {text}
            {remove && (
                <span className="ml-1 mr-n1" onClick={remove} style={{ cursor: 'pointer' }}>
                    {' '}
                    &times;{' '}
                </span>
            )}
        </span>
    )
}

export default TagItem
