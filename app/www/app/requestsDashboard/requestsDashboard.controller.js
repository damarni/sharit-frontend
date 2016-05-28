angular.module('app.controllers')
  .controller('RequestsDashboardCtrl',
    ['$scope', '$rootScope', '$translate',
      '$translatePartialLoader', '$state',
      'StubsFactory', '$ionicHistory',
      'PeticionFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $ionicHistory, PeticionFactory) {
      $translatePartialLoader.addPart('request');
      $translate.refresh();
      $scope.$state = $state;

      var _selected;

      $scope.selected = "";

      $scope.ngModelOptionsSelected = function (value) {
        if (arguments.length) {
          _selected = value;
        } else {
          return _selected;
        }
      };

      $scope.changetodashboard = function() {
        $ionicHistory.nextViewOptions({ disableBack: true});
        $state.go('app.dashboard');
      };

      // $scope.$on('$ionicView.beforeEnter', function () {
      //   $scope.items = JSON.parse(localStorage.getItem('requests'));
      // });

      PeticionFactory.getPeticiones().then(function (requests) {
        $scope.itemNames = [];
        for (i = 0; i < requests.length; i++) {
          if(typeof requests[i].Image1 === 'undefined' || requests[i].Image1 === null || requests[i].Image1 === ''){
            requests[i].Image1 = 'assets/img/lupa.png';
          }
          if(typeof requests[i].Name === 'undefined' || requests[i].Name === null || requests[i].Name === ''){
            requests[i].Name = 'Lupa mágica';
          }
          $scope.itemNames.push(requests[i].Name);
        }
        console.log(requests);
        $scope.items = requests;
      });

      $scope.requestProduct = function () {
        $state.go('app.requestProduct');
      };
      //$scope.items = JSON.parse(localStorage.getItem('requests'));
      //console.log($scope.items);
    }
  ]);



/*
 var requests;
 try {
 requests = localStorage.requests;
 }
 catch (err) {
 requests =
 "[{'requesterName': 'person1', 'productName': 'product1', 'description' : 'description1'}," +
 "{'requesterName': 'person2', 'productName': 'product2', 'description' : 'description2'}," +
 "{'requesterName': 'person2', 'productName': 'product2', 'description' : 'description2'}]";
 localStorage.requests = requests;
 }
 */
