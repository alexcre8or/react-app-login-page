(function () {
  'use strict';

  var App = function () {
  };

  App.prototype.run = function () {
    var router = include('Router');

    router.setRoute('/', {
      redirect: '/login'
    });

    router.setRoute('/login', {
      controller: 'LoginController'
    });

    router.setRoute('/logout', {
      controller: 'LogoutController'
    });

    router.setRoute('/register', {
      controller: 'RegistrationController'
    });
    router.run();
  };

  var app = new App();
  declare('App', app);
  app.run();

})();
