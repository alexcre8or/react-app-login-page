(function ($) {
  'use strict';
  $.ajaxTransport("+binary", function (options, originalOptions, jqXHR) {
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {
      return {
        send: function (headers, callback) {
          var xhr = new XMLHttpRequest(),
            url = options.url,
            type = options.type,
            async = options.async || true,
            dataType = options.responseType || "blob",
            data = options.data || null,
            username = options.username || null,
            password = options.password || null;

          xhr.addEventListener('load', function () {
            var data = {};
            data[options.dataType] = xhr.response;
            callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
          });

          xhr.open(type, url, async, username, password);
          for (var i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }

          xhr.responseType = dataType;
          xhr.send(data);
        },
        abort: function () {
        }
      };
    }
  });

  var Session = include('Session');

  var Api = function () {
      this.apiUrl = 'http://serverApi.Url/';
  };

  Api.prototype.getAuthHeaders = function (path) {
    var headers = [];
    var auth = Session.getAuth();
    var requestTime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (auth) {
      headers['X-Auth-User'] = auth.id;
      headers['X-Auth-Time'] = requestTime;
      headers['X-Auth-Sign'] = CryptoJS.HmacSHA1(path + ' ' + requestTime, auth.authKey).toString();
    }

    return headers;
  };


  Api.prototype.getUser = function (success, error) {
    var path = '/user';
    var headers = this.getAuthHeaders(path);
    $.ajax(this.apiUrl + path, {
      headers: headers,
      success: success,
      error: error,
      crossDomain: true
    });
  };

  Api.prototype.login = function (email, pass, success, error) {
    var self = this;
    var path = '/login';
    var passwordHash = CryptoJS.MD5(pass).toString();
    $.ajax(this.apiUrl + path, {
      method: 'POST',
      data: JSON.stringify({
        email: email,
        password: passwordHash
      }),
      contentType: 'application/json',
      success: function (auth) {
        Session.setAuth(auth);
        self.getUser(function (user) {
          if (isDefined(success)) {
            success(user);
          }
        });
      },
      error: error,
      crossDomain: true
    });
  };

  Api.prototype.register = function (email, pass, response, challenge, success, error) {
    var self = this;
    var path = '/user';
    var passwordHash = CryptoJS.MD5(pass).toString();

    $.ajax(this.apiUrl + path, {
      method: 'POST',
      data: JSON.stringify({
        email: email,
        password: passwordHash,
        response: response,
        challenge: challenge
      }),
      contentType: 'application/json',
      success: function (auth) {
        Session.setAuth(auth);
        self.getUser(function (user) {
          if (isDefined(success)) {
            success(user);
          }
        });
      },
      error: error,
      crossDomain: true
    });
  };

  Api.prototype.captcha = function (success, error) {
    var path = '/v1/challenge/w/150/h/100/font/56';
    $.ajax(this.apiUrl + path, {
      success: success,
      error: error,
      crossDomain: true
    });
  };

  Api.prototype.recover = function (email, success, error) {
    var path = '/user/password/recover';

    $.ajax(this.apiUrl + path, {
      method: 'POST',
      data: JSON.stringify({
        email: email
      }),
      contentType: 'application/json',
      success: success,
      error: error,
      crossDomain: true
    });
  };

  Api.prototype.logout = function (success, error) {
    var self = this;
    var path = '/logout';
    var headers = this.getAuthHeaders(path);

    $.ajax(this.apiUrl + path, {
      method: 'POST',
      headers: headers,
      success: function () {
        Session.setAuth(null);
        if (isDefined(success)) {
          success();
        }
      },
      error: error,
      crossDomain: true
    });
  };

  declare('Api', new Api());

})(jQuery);
