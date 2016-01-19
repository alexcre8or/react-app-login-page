(function ($) {
    'use strict';

    var Api = include('Api');

    var Loader = React.createClass({
        getInitialState: function () {
            return {};
        },

        render: function () {
            return (
                <div className="spinner row animated fadeIn"></div>
            );
        }
    });

    var Router = function () {
        this.routes = {};
        this.currentUrl = '';
    };

    Router.prototype.setRoute = function (route, options) {
        var patternParts = route.replace(/(^\/|\/$)/, '').split('/');
        var pattern = '';
        var args = 0;
        patternParts.forEach(function (item) {
            if (item.indexOf(':') === 0) {
                pattern += '\\/' + '\(\\w+\)';
                args++;
            } else {
                pattern += '\\/' + item;
            }
        });

        pattern = new RegExp('\^' + pattern + '\$', 'i');

        options.pattern = pattern;
        options.args = args;

        this.routes[route] = options;
    };

    Router.prototype.run = function () {
        var self = this;
        if (window.addEventListener) {
            window.addEventListener('hashchange', hashChangeWrapper, false);
        }
        else if (window.attachEvent) {
            window.attachEvent('onhashchange', hashChangeWrapper);
        }
        self.hashChange();

        function hashChangeWrapper() {
            self.hashChange();
        }
    };

    Router.prototype.navigate = function (url) {
        var route;
        var args = [];
        var self = this;

        for (var path in this.routes) {
            route = this.routes[path];

            var match = url.match(route.pattern);

            if (match) {
                for (var argIndex = 1; argIndex <= route.args; argIndex++) {
                    args.push(match[argIndex]);
                }

                break;
            }
        }

        if (isDefined(route.redirect)) {
            route = this.routes[route.redirect];
        }

        runController();

        function runController() {
            self.currentUrl = url;
            if(url!=='/'){
                window.location.hash = '#' + url;
            }
            var controller = include(route.controller);
            var app = document.getElementById('app');
            if(app) {
               React.render(<Loader />, app);
            }
            controller.apply(self, args);
        }
    };

    Router.prototype.hashChange = function () {
        var url = (window.location.hash || '#').slice(1);
        if (!url) {
            url = '/';
        }
        this.navigate(url);
    };

    Router.prototype.getCurrentUrl = function () {
        return this.currentUrl;
    };

    declare('Router', new Router());

})(jQuery);
