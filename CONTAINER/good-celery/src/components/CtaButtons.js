import React from 'react';
import _ from 'lodash';

import {Link, safePrefix, classNames} from '../utils';

export default class CtaButtons extends React.Component {
    render() {
        let actions = _.get(this.props, 'actions');
        return (
            <p className="block-buttons">
              {_.map(actions, (action, action_idx) => (
                <Link key={action_idx} to={safePrefix(_.get(action, 'url'))}
                   {...(_.get(action, 'new_window') ? {target: '_blank', rel: 'noopener'} : null)}
                   className={classNames('button', {'secondary': _.get(action, 'primary') !== true})}>{_.get(action, 'label')}</Link>
              ))}
            </p>
        );
    }
}
