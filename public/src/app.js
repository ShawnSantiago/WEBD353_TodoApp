angular.module('myApp', ['ngRoute', 'ngResource', 'ngMessages'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/contacts', {
                controller: 'mainCtrl',
                templateUrl: 'views/list.html'
            })
            // .when('/contact/:id', {
            //     controller: 'mainCtrl',
            //     templateUrl: 'views/list.html'
            // })
            .otherwise({
                redirectTo: '/contacts'   
            });
        $locationProvider.html5Mode(true);
    })
    .value('options', {})
    .run(function (options, Fields) {
        Fields.get().success(function (data) {
            options.displayed_fields = data;
        });
    });
