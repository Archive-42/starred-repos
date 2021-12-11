import React from 'react';
import _ from 'lodash';

import {Link, safePrefix, htmlToReact} from '../utils';
import ActionLink from './ActionLink';
import SubscribeForm from './SubscribeForm';

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="colophon" className="site-footer">
              <div className="footer-top outer">
                <div className="inner">
                  <div className="footer-widgets">
                    <div className="widget footer-branding">
                      {_.get(this.props, 'pageContext.site.siteMetadata.footer.logo_img') ? 
                      <p className="site-logo">
                        <Link to={safePrefix('/')}><img src={safePrefix(_.get(this.props, 'pageContext.site.siteMetadata.footer.logo_img'))} alt="Logo" /></Link>
                      </p>
                       : 
                      <p className="site-title">
                        <Link to={safePrefix('/')}>{_.get(this.props, 'pageContext.site.siteMetadata.header.title')}</Link>
                      </p>
                      }
                      {_.get(this.props, 'pageContext.site.siteMetadata.footer.tagline') && 
                      <p className="site-description">
                        {_.get(this.props, 'pageContext.site.siteMetadata.footer.tagline')}
                      </p>
                      }
                    </div>
                    {((_.get(this.props, 'pageContext.site.siteMetadata.footer.has_nav') && _.get(this.props, 'pageContext.site.siteMetadata.footer.nav_links')) || (_.get(this.props, 'pageContext.site.siteMetadata.footer.has_social') && _.get(this.props, 'pageContext.site.siteMetadata.footer.social_links'))) && 
                    <nav className="widget footer-navigation">
                      <div className="footer-nav-inside">
                        {(_.get(this.props, 'pageContext.site.siteMetadata.footer.nav_links') && _.get(this.props, 'pageContext.site.siteMetadata.footer.has_nav')) && 
                        <div className="secondary-nav">
                          <h2 className="widget-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.nav_title')}</h2>
                          <ul className="secondary-menu">
                            {_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.nav_links'), (action, action_idx) => (
                            <li key={action_idx}>
                              <ActionLink {...this.props} action={action} />
                            </li>
                            ))}
                          </ul>
                        </div>
                        }
                        {_.get(this.props, 'pageContext.site.siteMetadata.footer.has_social') && 
                        <div className="social-nav">
                          <h2 className="widget-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.social_title')}</h2>
                          <ul className="social-links">
                            {_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.social_links'), (action, action_idx) => (
                            <li key={action_idx}>
                              <ActionLink {...this.props} action={action} />
                            </li>
                            ))}
                          </ul>
                        </div>
                        }
                      </div>
                    </nav>
                    }
                    {_.get(this.props, 'pageContext.site.siteMetadata.footer.has_subscribe') && 
                    <div className="widget footer-subscribe">
                      <h2 className="widget-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_title')}</h2>
                      {_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_content') && 
                      <p>{htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_content'))}</p>
                      }
                      <SubscribeForm {...this.props} />
                    </div>
                    }
                  </div>
                </div>
              </div>
              <div className="site-info outer">
                <div className="inner">
                  {htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.content'))}
                  &nbsp;
                  {_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.links'), (action, action_idx) => (
                    <ActionLink key={action_idx} {...this.props} action={action} />
                  ))}
                </div>
              </div>
            </footer>
        );
    }
}
