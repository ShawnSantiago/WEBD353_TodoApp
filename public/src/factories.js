angular.module('myApp')
    .factory('Contact', function ($resource) {
        console.log('hit facContact')
        return $resource('/api/contact/:id', { id: '@id' }, {
            'update': { method: 'PUT' }
        });
    })
    .factory('Fields', function ($q, $http, Contact) {
        var url = '/options/displayed_fields',
            ignore = ['firstName', 'lastName', 'id', 'userId'],
            allFields = [],
            deferred = $q.defer(),

            contacts = Contact.query(function () {
                contacts.forEach(function (c) {
                    Object.keys(c).forEach(function (k) {
                        if (allFields.indexOf(k) < 0 && ignore.indexOf(k) < 0) allFields.push(k);
                    });
                });
                deferred.resolve(allFields);
            });

        return {
            get: function () {
                return $http.get(url);
            },
            set: function (newFields) {
                return $http.post(url, { fields: newFields });
            },
            headers: function () {
                return deferred.promise;
            }
        };
    })
    .factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  })
