import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import {Toaster} from 'react-hot-toast';
import {Layout} from "./pages/Layout";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Toaster/>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const {element, ...rest} = route;
                        return <Route key={index} {...rest} element={element}/>;
                    })}
                </Routes>
            </Layout>
        );
    }
}
