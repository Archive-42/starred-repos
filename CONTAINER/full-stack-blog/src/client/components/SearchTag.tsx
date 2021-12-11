/** @format */

import * as React from 'react'
import * as _ from 'lodash'

import FormField from './commons/FormField'
import TagBox from './commons/TagBox'
import { TAGS_API, join } from '../utils/apis'
import useLogin from '../utils/useLogin'

interface ISearchTag {
    state: [string[], (tagList: string[]) => void]
    hidden?: boolean
}

const SearchTag: React.FC<ISearchTag> = ({ state: [tagList, setTagList], hidden }) => {
    const { json } = useLogin()

    const [hide, setHide] = React.useState<boolean>(Boolean(hidden))

    const [tagSearch, setTagSearch] = React.useState('')
    const [searching, setSearching] = React.useState<string[]>([])

    React.useEffect(() => {
        ;(async () => {
            if (tagSearch.length && tagSearch !== '-') {
                let createTag = tagSearch.endsWith('-')
                    ? tagSearch.slice(0, tagSearch.length - 1)
                    : tagSearch
                let foundTags = await json<string[]>(join(TAGS_API, 'findlike', tagSearch))
                setSearching(_.union(_.difference(foundTags, [...tagList, createTag]), [createTag]))
            } else {
                setSearching([])
            }
        })()
    }, [tagSearch, tagList])

    const sanitizeTag = (s: string) =>
        s
            .replace(' ', '-')
            .replace('--', '-')
            .toLowerCase()

    const addTag = async (tag: string) => {
        setTagList([...tagList, tag])
        setTagSearch('')
        await json(TAGS_API, 'POST', { tag })
    }

    const removeTag = (tag: string) => {
        setTagList(tagList.filter((t) => t !== tag))
    }

    const toggleHide: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setHide(!hide)
    }

    if (hide) {
        return (
            <div className="d-flex">
                <button role="button" onClick={toggleHide} className="btn btn-light mx-auto">
                    Show Tag Editor
                </button>
            </div>
        )
    }

    return (
        <>
            <FormField
                state={[tagSearch, setTagSearch]}
                name="Search for Tags"
                transform={sanitizeTag}
            />
            {searching.length ? (
                <TagBox
                    tags={searching}
                    clickers={searching.map((search) => () => addTag(search))}
                />
            ) : (
                <p>Start typing to see available tags (or create your own!)</p>
            )}
            <TagBox tags={tagList} removers={tagList.map((tag) => () => removeTag(tag))} />
            <div className="d-flex">
                <button role="button" onClick={toggleHide} className="btn btn-light mx-auto">
                    Hide Tag Editor
                </button>
            </div>
        </>
    )
}

export default SearchTag
