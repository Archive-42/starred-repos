/** @format */

import * as React from 'react'

import TagItem from './TagItem'

interface ITagBox {
    tags: string[]
    clickers?: Array<(...args: any[]) => void>
    removers?: Array<(...args: any[]) => void>
}

const TagBox: React.FC<ITagBox> = ({ tags, clickers, removers }) => {
    // Must be at least an empty list
    removers = removers || []
    clickers = clickers || []

    return (
        <div className="d-flex flex-row flex-wrap overflow-hidden" style={{ height: '2.5rem' }}>
            {tags.map((t, i) => (
                <TagItem key={t} text={t} click={clickers[i]} remove={removers[i]} />
            ))}
        </div>
    )
}

export default TagBox
