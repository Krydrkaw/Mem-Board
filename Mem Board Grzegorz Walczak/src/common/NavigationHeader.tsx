import {Link} from "react-router-dom";
import React from "react";
import Nav from 'react-bootstrap/Nav'
import {Navbar} from "react-bootstrap";


export interface HeaderProp {
    onLogout: () => void;
    isAuthenticated: boolean;
}


export default class NavigationHeader extends React.Component<HeaderProp, {}> {
    constructor(props: HeaderProp) {
        super(props);
        this.state = {};
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick() {
        this.props.onLogout();
    }

    render() {
        let menuItems;
        if (this.props.isAuthenticated) {
            menuItems = [
                <Nav className="m-auto" key="1">
                    <Nav.Item className="navbar-nav ml-auto text-center" key="/">
                        <Nav.Link as={Link} to="/home" style={{marginRight: "20px", color: "antiquewhite"}}>
                            Strona startowa
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="navbar-nav ml-auto text-center" key="/mems">
                        <Nav.Link as={Link} to="/mems" style={{marginRight: "20px", color: "antiquewhite"}}>
                            Tablica memów
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="navbar-nav ml-auto text-center" key="/mems/new">

                        <Nav.Link as={Link} to="/new" style={{marginRight: "20px", color: "antiquewhite"}}>
                            Dodaj nowego mema
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="navbar-nav ml-auto text-center " key="logout">
                        <Nav.Link
                            onClick={this.handleMenuClick}
                            style={{marginRight: "20px", color: "antiquewhite"}}>Wyloguj się</Nav.Link>
                    </Nav.Item>
                </Nav>
            ]
            ;
        } else {
            menuItems = [
                <Nav className="m-auto" key="1">
                    <Nav.Item className="navbar-nav ml-auto text-center" key="/">
                        <Nav.Link as={Link} to="/home" style={{marginRight: "20px", color: "antiquewhite"}}>
                            Strona startowa
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="navbar-nav ml-auto text-center" key="/mems">
                        <Nav.Link as={Link} to="/mems" style={{marginRight: "20px", color: "antiquewhite"}}>
                            Tablica memów
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="navbar-nav ml-auto text-center" key="/login">
                        <Nav.Link as={Link} to="/login" style={{marginRight: "20px", color: "antiquewhite"}}>
                            Zaloguj się
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            ];
        }
        return (
            <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {menuItems}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

// export default withRouter(Header);
// export default withRouter<HeaderProp, Component<HeaderProp>>(({ staticContext, ...props }) => MyComp(props));

