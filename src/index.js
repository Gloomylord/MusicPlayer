import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "mobx-react";

import mainStore from "./Stores/mainStore";

const stores = {
    mainStore,
};

render(<Provider {...stores}>
    <App/>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
