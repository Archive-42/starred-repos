import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {htmlToReact, getPages, Link, safePrefix, markdownify} from '../utils';

export default class SectionPosts extends React.Component {
    render() {
        let section = _.get(this.props, 'section');
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        let recent_posts = display_posts.slice(0, 3);
        return (
            <section id={_.get(section, 'section_id')} className={'block posts-block bg-' + _.get(section, 'background') + ' outer'}>
              <div className="block-header inner-small">
                {_.get(section, 'title') && 
                <h2 className="block-title">{_.get(section, 'title')}</h2>
                }
                {_.get(section, 'subtitle') && 
                <p className="block-subtitle">
                  {htmlToReact(_.get(section, 'subtitle'))}
                </p>
                }
              </div>
              <div className="inner">
                <div className="post-feed">
                  {_.map(recent_posts, (post, post_idx) => (
                  <article key={post_idx} className="post post-card">
                    <div className="post-card-inside">
                      {_.get(post, 'frontmatter.thumb_image') && 
                      <Link className="post-card-thumbnail" to={safePrefix(_.get(post, 'url'))}>
                        <img className="thumbnail" src={safePrefix(_.get(post, 'frontmatter.thumb_image'))} alt={_.get(post, 'frontmatter.title')} />
                      </Link>
                      }
                      <div className="post-card-content">
                        <header className="post-header">
                          <h3 className="post-title"><Link to={safePrefix(_.get(post, 'url'))} rel="bookmark">{_.get(post, 'frontmatter.title')}</Link></h3>
                        </header>
                        <div className="post-excerpt">
                          {markdownify(_.get(post, 'frontmatter.excerpt'))}
                        </div>
                        <footer className="post-meta">
                          <time className="published"
                            dateTime={moment(_.get(post, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
                        </footer>
                      </div>
                    </div>
                  </article>
                  ))}
                </div>
              </div>
            </section>
        );
    }
}
