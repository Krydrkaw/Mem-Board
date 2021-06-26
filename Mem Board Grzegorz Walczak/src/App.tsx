import React from 'react';
import './App.css';
import {Container, Row} from "react-bootstrap";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import NavigationHeader from "./common/NavigationHeader";
import {CircularProgress} from "@material-ui/core";
import {getCurrentUser, logout} from "./common/FakeApi";
import LoginPage from "./pages/login/LoginPage";
import AddMemPage from "./pages/new/AddMemPage";
import PrivateRoute from "./common/PrivateRoute";
import HomePage from "./pages/HomePage";
import MemsPage from "./pages/mems/MemsPage";

interface IProps extends RouteComponentProps<any> {
}

class App extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogout(redirectTo = "/home") {
        logout();
        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);
    }

    handleLogin() {
        this.loadCurrentUser();
        this.props.history.push("/mems");
    }


    render() {
        if (this.state.isLoading) {
            return <div className="loaderr"><CircularProgress/></div>
        }

        return (

            <Container>
                <Row>
                    <NavigationHeader isAuthenticated={this.state.isAuthenticated}
                                      onLogout={this.handleLogout}/>
                </Row>


                        <Switch>

                            <Route exact path="/">
                                <Redirect to="/home"/>
                            </Route>
                            <Route path="/home" render={(props) => <HomePage/>}/>
                            <Route path="/mems"
                                   render={(props) => <MemsPage isAuthenticated={this.state.isAuthenticated}/>}/>
                            <PrivateRoute authenticated={this.state.isAuthenticated}
                                          currentUser={this.state.currentUser}
                                          path="/new"
                                          component={AddMemPage}
                                          handleLogout={this.handleLogout}
                            />
                            <Route path="/login"
                                   render={(props) => <LoginPage onLogin={this.handleLogin} {...props} />}/>

                        </Switch>

            </Container>

        );
    }

}

export default withRouter(App);
