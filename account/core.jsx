(function () {
  'use strict';

  // Namespace.
  window.App = {};

  // Helpers.
  function include(moduleName) {
    return window.App[moduleName];
  }

  function declare(moduleName, instance) {
    window.App[moduleName] = instance;
  }

  function isDefined(prop) {
    return typeof prop !== 'undefined';
  }

  function isUndefined(prop) {
    return typeof prop === 'undefined';
  }

  window.include = include;
  window.declare = declare;
  window.isDefined = isDefined;
  window.isUndefined = isUndefined;

  // Polyfills.
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

})();
