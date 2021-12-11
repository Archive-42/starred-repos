import React from 'react';
import _ from 'lodash';

import {htmlToReact, markdownify} from '../utils';

export default class SectionFaq extends React.Component {
    render() {
        let section = _.get(this.props, 'section');
        return (
            <section id={_.get(section, 'section_id')} className={'block faq-block bg-' + _.get(section, 'background') + ' outer'}>
              <div className="inner-small">
                <div className="block-header">
                  {_.get(section, 'title') && 
                  <h2 className="block-title">{_.get(section, 'title')}</h2>
                  }
                  {_.get(section, 'subtitle') && 
                  <p className="block-subtitle">
                    {htmlToReact(_.get(section, 'subtitle'))}
                  </p>
                  }
                </div>
                {_.get(section, 'faq_items') && 
                <dl className="faq-accordion">
                  {_.map(_.get(section, 'faq_items'), (faqitem, faqitem_idx) => (<React.Fragment key={faqitem_idx}>
                  <dt key={faqitem_idx} className="accordion-header">
                    <button className="accordion-trigger">
                      <div className="accordion-title">{_.get(faqitem, 'question')}</div>
                      <div className="accordion-icon icon-plus" />
                    </button>
                  </dt>
                  <dd key={faqitem_idx} className="accordion-panel">
                    <div className="accordion-content">
                      {markdownify(_.get(faqitem, 'answer'))}
                    </div>
                  </dd>
                  </React.Fragment>))}
                </dl>
                }
              </div>
            </section>
        );
    }
}
