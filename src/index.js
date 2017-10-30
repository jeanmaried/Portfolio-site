import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
