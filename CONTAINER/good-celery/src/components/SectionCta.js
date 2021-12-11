import React from 'react';
import _ from 'lodash';

import {htmlToReact} from '../utils';
import ActionLink from './ActionLink';

export default class SectionCta extends React.Component {
    render() {
        let section = _.get(this.props, 'section');
        return (
            <section id={_.get(section, 'section_id')} className="block cta-block bg-accent outer">
              <div className="inner-large">
                <div className="grid">
                  <div className="cell block-content">
                    {_.get(section, 'title') && 
                    <h2 className="block-title">{_.get(section, 'title')}</h2>
                    }
                    {_.get(section, 'subtitle') && 
                    <p className="block-subtitle">
                      {htmlToReact(_.get(section, 'subtitle'))}
                    </p>
                    }
                  </div>
                  {_.get(section, 'actions') && 
                  <div className="cell block-buttons">
                    {_.map(_.get(section, 'actions'), (action, action_idx) => (
                      <ActionLink key={action_idx} {...this.props} action={action} class_names={'button white large'} />
                    ))}
                  </div>
                  }
                </div>
              </div>
            </section>
        );
    }
}
