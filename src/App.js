import React, {Component} from "react";
import './App.css';
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

        return (
            <div className="App">


                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Travelnik
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        {/*{showModeratorBoard && (*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <Link to={"/mod"} className="nav-link">*/}
                        {/*            Moderator Board*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*)}*/}
                        {/*{showAdminBoard && (*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <Link to={"/admin"} className="nav-link">*/}
                        {/*            Admin Board*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*)}*/}
                        {/*{currentUser && (*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <Link to={"/user"} className="nav-link">*/}
                        {/*            User*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*)}*/}
                    </div>
                    {/*{currentUser ? (*/}
                    {/*    <div className="navbar-nav ml-auto">*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <Link to={"/profile"} className="nav-link">*/}
                    {/*                {currentUser.username}*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <a href="/login" className="nav-link" onClick={this.logOut}>*/}
                    {/*                LogOut*/}
                    {/*            </a>*/}
                    {/*        </li>*/}
                    {/*    </div>*/}
                    {/*) : (*/}
                    {/*    <div className="navbar-nav ml-auto">*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <Link to={"/login"} className="nav-link">*/}
                    {/*                Login*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <Link to={"/register"} className="nav-link">*/}
                    {/*                Sign Up*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </nav>
                <div className="col-md-12">
                    <div className="card card-container">
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                        />
                        <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={this.state.loading}
                                >
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>
                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </div>
                </div>
                {/*<div className="container mt-3">*/}
                {/*    <Switch>*/}
                {/*        <Route exact path={["/", "/home"]} component={Home} />*/}
                {/*        /!*<Route exact path="/login" component={Login} />*!/*/}
                {/*        /!*<Route exact path="/register" component={Register} />*!/*/}
                {/*        <Route exact path="/profile" component={Profile} />*/}
                {/*        /!*<Route path="/user" component={BoardUser} />*!/*/}
                {/*        /!*<Route path="/mod" component={BoardModerator} />*!/*/}
                {/*        /!*<Route path="/admin" component={BoardAdmin} />*!/*/}
                {/*    </Switch>*/}
                {/*</div>*/}
            </div>

        );
    }
}
export default App;
