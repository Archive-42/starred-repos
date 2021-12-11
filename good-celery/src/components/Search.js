import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { connectHits, InstantSearch, SearchBox } from 'react-instantsearch-dom';
import {Link, safePrefix} from '../utils';
import moment from 'moment-strftime';

const Hits = connectHits(({ hits }) => (
    <div>
        {hits.length ? (
            <div className="post-feed">
            {hits.map(hit => {
            return (
                <article key={hit.objectID} className="post post-card">
                    <div className="post-card-inside">
                        <Link className="post-card-thumbnail" to={safePrefix(hit.fields.slug)}>
                            <img className="thumbnail" src={safePrefix(hit.thumb_image)} alt={hit.title} />
                        </Link>
                        <div className="post-card-content">
                            <header className="post-header">
                                <h2 className="post-title"><Link to={safePrefix(hit.fields.slug)} rel="bookmark">{hit.title}</Link></h2>
                            </header>
                            <div className="post-excerpt">
                                <p>{hit.description}</p>
                            </div>
                            <footer className="post-meta">
                                <time className="published"
                                dateTime={moment(hit.date).strftime('%Y-%m-%d %H:%M')}>{moment(hit.date).strftime('%B %d, %Y')}</time>
                            </footer>
                        </div>
                    </div>
                </article>
            )
            })}
            </div>
        ) : (
        <p>There were no results for your query. Please try again.</p>
        )}
    </div>
))

export default function Search({indexName}) {
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )
    return (<InstantSearch
        indexName={indexName}
        searchClient={searchClient}
    >
        <SearchBox />
        <Hits />
    </InstantSearch>)
}