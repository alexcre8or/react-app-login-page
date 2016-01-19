(function ($) {
  'use strict';

  var Session = function () {
    this.redirectTo = '/profile';
    this.transaction = null;
  };

  Session.prototype.setAuth = function (auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
  };

  Session.prototype.getAuth = function () {
    var auth = localStorage.getItem('auth');
    return JSON.parse(auth);
  };

  Session.prototype.setRedirectAfterLogin = function (redirectTo) {
    this.redirectTo = redirectTo;
  };

  Session.prototype.getRedirectAfterLogin = function () {
    return this.redirectTo;
  };

  declare('Session', new Session());

})(jQuery);
