import React from "react";
import ReactDOM, {render} from "react-dom";
import { BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom"
import './index.css';
import App from "./App";


import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={App} />

    </BrowserRouter>,
    document.getElementById("root")
);
