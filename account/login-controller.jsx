(function (React) {
    'use strict';

    var Api = include('Api');
    var Router = include('Router');
    var Session = include('Session');
    var Layouts = include('Layouts');

    var LoginForm = React.createClass({
        getInitialState: function () {
            return {submitDisabled: true};
        },

        handleSubmit: function (e) {
            e.preventDefault();
            var self = this;
            var email = React.findDOMNode(this.refs.email).value.trim();
            var password = React.findDOMNode(this.refs.password).value.trim();

            this.setState({submitDisabled: true});

            Api.login(email, password,
                function success() {
                    Router.navigate(Session.getRedirectAfterLogin());
                }, function (error) {
                    var data = JSON.parse(error.responseText);
                    self.setState({error: data.reason});
                    self.validateForm();
                });
        },

        validateForm: function () {
            var email = React.findDOMNode(this.refs.email).value.trim();
            var password = React.findDOMNode(this.refs.password).value.trim();

            var formValid = true;
            formValid = formValid && this.validateEmail(email);
            formValid = formValid && this.validatePassword(password);

            this.setState({submitDisabled: !formValid});
        },

        validatePassword: function (password) {
            return password.length > 3;
        },

        validateEmail: function (email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        },
        linkToRegister: function () {
            window.location.href = "#/register";
        },
        render: function () {

            var error = '';
            if (isDefined(this.state.error) && this.state.error) {
                error = (<div className="alert alert-danger">{this.state.error}</div>);
            }

            return (
                <div className="login-form">
                    <div id="open-menu" className="main-nav-trigger">Menu
                        <span className="main-nav-icon"></span>
                    </div>
                    <NavMenu/>
                    <div className="container">
                        <div className="row">
                            <div className="form-wrapper">
                                <a href="/" title="На главную">
                                    <div className="form-logo"></div>
                                </a>
                                {error}
                                <div className="form-container">
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="email" onChange={this.validateForm} className="form-control"
                                               placeholder="Email" ref="email"/>
                                        <input type="password" onChange={this.validateForm} className="form-control"
                                               placeholder="Пароль" ref="password"/>
                                        <input type="submit" disabled={this.state.submitDisabled}
                                               className="btn btn-login" value="Войти"/>
                                        <input type="button" className="btn register-link" value="Регистрация"
                                               onClick={this.linkToRegister}/>
                                        <a href="#/recover" className="password-recover-link">Забыли пароль?</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });


    function LoginController() {
        var app = document.getElementById('app');
        if (app) {
            Api.getUser(function (user) {
                Router.navigate('/profile');
            }, function () {
                React.render(<LoginForm />, app);
            });
        }

    }

    declare('LoginController', LoginController);
})(React);
