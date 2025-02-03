import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import './assets/favicon.ico'

declare global {
    interface Window {
        __INITIAL_PROPS__: any;
    }
}

const container = document.getElementById('app');
const initialProps = window.__INITIAL_PROPS__



hydrateRoot(
    container,
    <BrowserRouter>
        <App {...initialProps}/>
    </BrowserRouter>
)