import React from 'react';
import './App.css';
import MicroFrontend from "./Microfrontend";

function App() {
    const {
        REACT_APP_BROWSE_HOST: browseHost,
    } = process.env;

    const Browse = ({history}) => (
        <MicroFrontend history={history} host={browseHost} name="Browse"/>
    );
    return (
        <div className="App">
            This is Container App with the micro app rendered below
            <br/>
            <div style={{
                margin: 'auto',
                maxWidth: '80%',
                marginTop: '20px'
            }}><Browse/></div>
        </div>
    );
}

export default App;
