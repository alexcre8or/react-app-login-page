(function () {
  'use strict';

  var Api = include('Api');
  var Router = include('Router');

  function LogoutController() {
    Api.logout(function () {
      Router.navigate('/login');
    });
  }

  declare('LogoutController', LogoutController);
})();