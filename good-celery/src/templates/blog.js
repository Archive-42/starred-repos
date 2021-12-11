import React from 'react';
import _ from 'lodash';
import Search from '../components/Search';

import {Layout} from '../components/index';
import {getPages} from '../utils';

export default class Blog extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
            <div className="outer">
              <div className="inner">
                <Search indexName="Posts"></Search>
              </div>
            </div>
            </Layout>
        );
    }
}
