import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import {Layout} from '../components/index';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

export default class Search extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <div className="outer">
          <div className="inner">
            <InstantSearch searchClient={searchClient} indexName="Posts">
            <SearchBox />
            <Hits />
            </InstantSearch>
          </div>
        </div>
      </Layout>
    )
  }
}