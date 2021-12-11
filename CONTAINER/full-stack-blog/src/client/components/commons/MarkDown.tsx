/** @format */

import * as React from 'react'

import { Converter } from 'showdown'
import ReactHTMLParser from 'react-html-parser'

const converter = new Converter({
    smoothLivePreview: true,
    simplifiedAutoLink: true,
    emoji: true,
})

interface IMarkDown {
    content: string
    className?: string
}

const MarkDown: React.FC<IMarkDown> = ({ content, className = '' }) => {
    return <div className={className}>{ReactHTMLParser(converter.makeHtml(content))}</div>
}

export default MarkDown
