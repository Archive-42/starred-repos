import React from 'react';
import _ from 'lodash';

import {Link, safePrefix} from '../utils';

export default class ActionLink extends React.Component {
    render() {
        let action = _.get(this.props, 'action');
        let class_names = _.get(this.props, 'class_names');
        return (
            <Link to={safePrefix(_.get(action, 'url'))}
               {...(_.get(action, 'new_window') ? {target: '_blank', rel: 'noopener'} : null)}
               className={class_names}>{_.get(action, 'label')}</Link>
        );
    }
}
