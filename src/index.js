import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import "./styles/main.css";


class Index extends React.Component {

    render() {
        return <App />
    }

}

ReactDOM.render(<Index />, document.querySelector("#root"));