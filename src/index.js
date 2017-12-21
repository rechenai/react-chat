import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import BossInfo from './container/bossInfo/bossInfo'
import AuthRoute from './components/authrouter/authRouter'
import reducers from './reducer'
import './config'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
function Boss() {
  return <h2>Boss</h2>
}

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Route path="/geniusInfo" component={GeniusInfo} />
        <Route path="/bossInfo" component={BossInfo} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
