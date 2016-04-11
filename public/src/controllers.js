angular.module('myApp')
    .controller("mainCtrl", function($scope, Contact, $rootScope, $location, options, $routeParams){
        $rootScope.PAGE = "new";
      $scope.todos = Contact.query();
      // console.log(Contact.query());
      $scope.getRandomSpan = function(){
        return Math.floor((Math.random()*6)+1);
      }
      $scope.addTodo = function(item){
            $scope.contact = new Contact({
                "firstname": [item]
                // "id": [$scope.getRandomSpan()]
            });
             $scope.contact.$save();
                $scope.todos.push({"firstname": item});
                $location.url('/contacts');
                console.log($scope.contact)

            
            
            
       
        // $scope.newItem="";
      }
      $scope.removeItem = function(index) {
       console.log($scope.contact)
        $scope.contact = Contact.get({ id: parseInt(index, 10) }); 
        console.log($scope.contact)
        $scope.contact.$delete();
        $location.url('/contacts');
        $scope.todos.splice(index, 1);
        
      };

    })
    // .controller('ListController', function ($scope, $rootScope, Contact, $location, options) {
    //     $rootScope.PAGE = "all";
    //     $scope.contacts = Contact.query();
    //     $scope.fields = ['firstName', 'lastName'].concat(options.displayed_fields);

    //     $scope.sort = function (field) {
    //         $scope.sort.field = field;
    //         $scope.sort.order = !$scope.sort.order;
    //     };

    //     $scope.sort.field = 'firstName';
    //     $scope.sort.order = false;

    //     $scope.show = function (id) {
    //         $location.url('/contact/' + id);
    //     };
    // })
    // .controller('NewController', function ($scope, $rootScope, Contact, $location) {
    //     $rootScope.PAGE = "new";
    //     $scope.contact = new Contact({
    //         firstName: ['', 'text'],
    //         lastName:  ['', 'text'],
    //         email:     ['', 'email'],
    //         homePhone: ['', 'tel'],
    //         cellPhone: ['', 'tel'],
    //         birthday:  ['', 'date'],
    //         website:   ['', 'url'],
    //         address:   ['', 'text']
    //     });

    //     $scope.save = function () {
    //         if ($scope.newContact.$invalid) {
    //             $scope.$broadcast('record:invalid');
    //         } else {
    //             $scope.contact.$save();
    //             $location.url('/contacts');
    //         }
    //     };
    // })
    // .controller('SingleController', function ($scope, $rootScope, $location, Contact, $routeParams) {
    //     $rootScope.PAGE = "single";
    //     $scope.contact = Contact.get({ id: parseInt($routeParams.id, 10) }); 
    //     $scope.delete = function () {
    //         $scope.contact.$delete();
    //         $location.url('/contacts');
    //     };
    // })
    // .controller('SettingsController', function ($scope, $rootScope, options, Fields) {
    //     $rootScope.PAGE = 'settings';
        
    //     $scope.allFields = [];
    //     $scope.fields = options.displayed_fields;

    //     Fields.headers().then(function (data) {
    //         $scope.allFields = data;
    //     });

    //     $scope.toggle = function (field) {
    //         var i = options.displayed_fields.indexOf(field);

    //         if (i > -1) {
    //             options.displayed_fields.splice(i, 1);
    //         } else {
    //             options.displayed_fields.push(field); 
    //         }

    //         Fields.set(options.displayed_fields);
    //     };
    // });
