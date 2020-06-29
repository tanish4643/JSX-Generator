import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/login';
import Home from './views/Home';

import {history} from './history';
import registerServiceWorker from './registerServiceWorker';
import { Route, Router,Switch, Redirect } from 'react-router-dom'

ReactDOM.render(<Router history={history}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
	         			<Redirect to='/'/>
	         		</Switch>
				</Router>, document.getElementById('root'));
registerServiceWorker();
