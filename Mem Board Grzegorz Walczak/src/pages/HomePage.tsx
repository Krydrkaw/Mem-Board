import React, {Component} from "react";

export default class HomePage extends Component {

    render() {
        return (
            <div className="App-header container-img">
                <img src={process.env.PUBLIC_URL + '/mem_face.png'} className="App-logo" alt="logo"/>
            </div>
        );
    }
}
