angular.module('ionicApp.controllers', [])

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('HomeTabCtrl', function($scope) {

  $scope.movies = [
    {"name":"Sample Movie 1","releaseDate":"28th May,2015","post":"ionic.png",
     "short_plot":"This is a sample plot lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
   },
    {"name":"Sample Movie 2","releaseDate":"28th May,2015","post":"ionic.png",
    "short_plot":"This is a sample plot lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
  },
    {
      "name":"Sample Movie 3","releaseDate":"28th May,2015","post":"ionic.png",
      "short_plot":"This is a sample plot lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    }
  ]

})
