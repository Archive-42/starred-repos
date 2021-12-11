import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime'
import SEO from '../components/SEO'

import {Layout} from '../components/index';
import {safePrefix, htmlToReact} from '../utils';

export default class Post extends React.Component {
    render() {
        let twitter = '';
        if (_.get(this.props, 'pageContext.site.siteMetadata.footer.has_social') && _.get(this.props, 'pageContext.site.siteMetadata.footer.social_links')) {
          let social_links =  _.get(this.props, 'pageContext.site.siteMetadata.footer.social_links')
          let twitter = '@' + social_links.find(element => element.label === "Twitter").url.split('/').pop()
        }
        return (
            <Layout {...this.props}>
            <SEO
              title={_.get(this.props, 'pageContext.frontmatter.title')}
              description={_.get(this.props, 'pageContext.frontmatter.excerpt')}
              image={safePrefix(_.get(this.props, 'pageContext.frontmatter.image'))}
              author={twitter}
            />
            <div className="outer">
              <div className="inner-medium">
                <article className="post post-full">
                  <header className="post-header">
                    <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                  </header>
                  {_.get(this.props, 'pageContext.frontmatter.image') && 
                  <div className="post-thumbnail">
                    <img src={safePrefix(_.get(this.props, 'pageContext.frontmatter.image'))} alt={_.get(this.props, 'pageContext.frontmatter.title')} />
                  </div>
                  }
                  {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                  <div className="post-subtitle">
                    {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                  </div>
                  }
                  <div className="post-content">
                    {htmlToReact(_.get(this.props, 'pageContext.html'))}
                  </div>
                  <footer className="post-meta">
                    <time className="published"
                      dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%A, %B %e, %Y')}</time>
                  </footer>
                </article>
              </div>
            </div>
            </Layout>
        );
    }
}