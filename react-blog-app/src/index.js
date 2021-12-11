import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.js'
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
