import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { MainLayout } from './modules/MainLayout/MainLayout';
import Home from './components/Home'
import Game from './components/Game'
import GameOver from './components/GameOver'

import './sass/style.scss';

import store from './store';
import { Provider } from 'react-redux';


class App extends React.Component {

    render() {
        return (

            <BrowserRouter>
                <MainLayout>
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route exact path={'/game'} component={Game} />
                        <Route exact path={'/gameover'} component={GameOver} />
                    </Switch>
                </MainLayout>
            </BrowserRouter>

        );
    }
}

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, rootElement
);
