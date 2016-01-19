var Api = include('Api');
var Router = include('Router');
var Session = include('Session');
var Header = React.createClass({
    getInitialState: function () {
        var self = this;

        Api.getUser(function (user) {
            self.setState({user: user});
        });
        return {user: {}};
    },
    render: function () {
        return (
            <nav className="navbar navbar-new-default navbar-fixed-top" role="navigation">
                <div className="wrapper">
                    <div className="personal-info">
                        <UserControls user={this.state.user}/>
                        <UserInfo user={this.state.user}/>
                    </div>
                </div>
                <a href="/" className="navbar-brand-logo">
                    <span className="brand-block brand-logo brand-logo-default"></span>
                </a>
            </nav>
        );
    }
});

var UserInfo = React.createClass({
    getInitialState: function () {
        return null;
    },
    render: function () {
        var userInfo = null;
        if (this.props.user.email) {
            userInfo = (
                <div>
                    <div className="user-email">
                        {this.props.user.email}
                    </div>
                    <ul className="user-nav">
                        <li className="logout-link">
                            <a href="/account#/logout">Выход</a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            userInfo = (
                <div className="login-section">
                    <a href="/account#/login">Войти</a>
                    <span className="middle-text">или</span>
                    <a href="/account#/register">зарегистрироваться</a>
                </div>
            );
        }

        return (
            <div className="user-info">{userInfo}</div>
        );
    }
});

var UserAvatar = React.createClass({
    getInitialState: function () {
        return null;
    },
    render: function () {
        var userAvatar = null;

        if (this.props.user.email) {
            userAvatar = (
                <img src="/../images/user-avatar.svg" alt=""/>
            );
        } else {
            userAvatar = (
                <img src="/../images/user-avatar.svg" alt=""/>
            );
        }

        return (
            <div>{userAvatar}</div>
        );
    }
});

var UserControls = React.createClass({
    getInitialState: function () {
        return null;
    },
    render: function () {
        var userControls = null;

        if (this.props.user.email) {
            userControls = (
                <div>
                    <UserAvatar user={this.props.user}/>
                    <ul className="user-nav-hovered">
                        <a href="/account#/profile">
                            <li className="my-orders">Мои покупки</li>
                        </a>
                        <a href="/account#/logout">
                            <li className="logout-link">Выход</li>
                        </a>
                    </ul>
                </div>
            );
        } else {
            userControls = (
                <div>
                    <UserAvatar user={this.props.user}/>
                    <ul className="user-nav-hovered">
                        <a href="/account#/profile">
                            <li className="my-orders">Войти</li>
                        </a>
                    </ul>
                </div>
            );
        }

        return (
            <div className="user-avatar">{userControls}</div>
        );
    }
});

var Footer = React.createClass({
    getInitialState: function () {
        return null;
    },

    render: function () {
        return (
            <footer>
                <div className="container">
                    <!-- Footer Content Here -->
                </div>
            </footer>
        );
    }
});
