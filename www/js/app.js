var base = "http://mmc.orgfree.com";

var host = "http://localhost:90/mmc";

angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/main/profile.html'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('movie',{
      url:"/movies/:movieId",
      templateUrl:"templates/main/movie.html",
      controller:'MovieCtrl'
    })

    .state('tvshow',{
      url:"/tvshows/:Id",
      templateUrl:"templates/main/tvshow.html",
      controller:'ShowCtrl'
    })

    .state('actor',{
      url:"/actors/:actorId",
      templateUrl:"templates/main/actor.html",
      controller:'HomeTabCtrl'
    })

    .state('tabs.tvshows', {
      url: "/tvshows",
      views: {
        'tvshows-tab': {
          templateUrl: "templates/main/tvshows.html",
          controller: 'ShowsCtrl'
        }
      }
    })

    .state('tabs.actors', {
      url: "/actors",
      views: {
        'actors-tab': {
          templateUrl: "templates/main/actors.html",
          controller: 'HomeTabCtrl'
        }
      }
    })

    .state('tabs.movies', {
      url: "/movies",
      views: {
        'movies-tab': {
          templateUrl: "templates/main/movies.html",
          controller: 'MoviesCtrl'
        }
      }
    })

    .state('favourites', {
      url: "/favourites",
      templateUrl: "templates/main/favourites.html",
      controller: 'FavCtrl'

    })

    .state('towatch', {
      url: "/towatch",
      templateUrl: "templates/main/towatch.html",
      controller: 'FavCtrl'

    })

    .state('watched', {
      url: "/watched",
      templateUrl: "templates/main/watched.html",
      controller: 'FavCtrl'

    })

    .state('tabs.about', {
      url: "/about",
      templateUrl: "templates/main/about.html"

    })

    .state('contact', {
      url: "/contact",
      templateUrl: "templates/main/contact.html"
    })

    .state('towatch.movies',{
      url:'/towatchmovies',
      views:{
        "towatch-movies":{
          templateUrl:"templates/main/towatch-movies.html",
          controller:"FavCtrl"
        }
      }
    })

    .state('towatch.tvshows',{
      url:'/towatchshows',
      views:{
        "towatch-tvshows":{
          templateUrl:"templates/main/towatch-tvshows.html",
          controller:"FavCtrl"
        }
      }
    });

   $urlRouterProvider.otherwise("/tab/movies");

})
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})

.controller('FavCtrl',["$scope",function($scope){



}])

.controller("MoviesCtrl",["$scope","$state","$ionicSideMenuDelegate","MMCFactory","$ionicLoading",function($scope,$state,$ionicSideMenuDelegate,MMCFactory,$ionicLoading) {
        $ionicLoading.show();
        MMCFactory.getAllMovies()
                               .success(function(data){
                                 $scope.movies = [];
                                 $scope.popular_movies = data.popular_movies;

                                 $scope.upcoming_movies = data.upcoming_movies;
                                 $scope.toprated_movies = data.toprated_movies;
                                 $scope.nowplaying_movies = data.nowplaying_movies;
                                 $scope.latest_movies = data.latest_movies;

                                 for(var i=0;i<$scope.popular_movies.length;i++){
                                   $scope.movies.push($scope.popular_movies[i]);
                                 }
                                 for(var i=0;i<$scope.upcoming_movies.length;i++){
                                   $scope.movies.push($scope.upcoming_movies[i]);
                                 }
                                 for(var i=0;i<$scope.toprated_movies.length;i++){
                                   $scope.movies.push($scope.toprated_movies[i]);
                                 }
                                 for(var i=0;i<$scope.nowplaying_movies.length;i++){
                                   $scope.movies.push($scope.nowplaying_movies[i]);
                                 }
                                 for(var i=0;i<$scope.latest_movies.length;i++){
                                   $scope.movies.push($scope.latest_movies[i]);
                                 }

                                  $ionicLoading.hide();
                               })
                               .error(function(err,statusCode){
                                   $ionicLoading.show({
                                      template:'Error in network connection, Please try again later...',
                                      duration:5000
                                   });
                               });
}])

.controller("MovieCtrl",["$scope","$state","$ionicSideMenuDelegate","MMCFactory","$ionicLoading",
                        function($scope,$state,$ionicSideMenuDelegate,MMCFactory,$ionicLoading) {

                          var movieId = $state.params.movieId;
                          $ionicLoading.show();
                          MMCFactory.getMovie(movieId)
                                    .success(function(data){
                                      $scope.movie = data;
                                      $ionicLoading.hide();
                                    })
                                    .error(function(err,statusCode){
                                      $ionicLoading.show({
                                        template:'Error in network connection, Please try again later...',
                                        duration:3000
                                      });
                                    });
}])

.controller("ShowsCtrl",["$scope","$state","$ionicSideMenuDelegate","MMCFactory","$ionicLoading",function($scope,$state,$ionicSideMenuDelegate,MMCFactory,$ionicLoading) {
  MMCFactory.getAllTVShows()
                   .success(function(data){
                     $scope.tvshows = [];
                     $scope.popular_tvshows = data.popular_tvshows;
                     $scope.toprated_tvshows = data.toprated_tvshows;
                     $scope.airingtoday_tvshows = data.airingtoday_tvshows;
                     $scope.onair_tvshows = data.onair_tvshows;
                     $scope.latest_tvshows = data.latest_tvshows;

                     for(var i=0;i<$scope.popular_tvshows.length;i++){
                       $scope.tvshows.push($scope.popular_tvshows[i]);
                     }
                     for(var i=0;i<$scope.toprated_tvshows.length;i++){
                       $scope.tvshows.push($scope.toprated_tvshows[i]);
                     }
                     for(var i=0;i<$scope.airingtoday_tvshows.length;i++){
                       $scope.tvshows.push($scope.airingtoday_tvshows[i]);
                     }
                     for(var i=0;i<$scope.onair_tvshows.length;i++){
                       $scope.tvshows.push($scope.onair_tvshows[i]);
                     }
                     for(var i=0;i<$scope.latest_tvshows.length;i++){
                       $scope.tvshows.push($scope.latest_tvshows[i]);
                     }
                     console.log($scope.tvshows);
                   })
                   .error(function(err,statusCode){
                     $ionicLoading.show({
                        template:'Error in network connection, Please try again later...',
                        duration:5000
                     });
                   });
}])

.controller("ShowCtrl",["$scope","$state","$ionicSideMenuDelegate","MMCFactory","$ionicLoading",function($scope,$state,$ionicSideMenuDelegate,MMCFactory,$ionicLoading) {
  var showId = $state.params.Id;
  $ionicLoading.show();
  MMCFactory.getShow(showId)
            .success(function(data){
              $scope.tvshow = data;
              $ionicLoading.hide();
            })
            .error(function(err,statusCode){
                $ionicLoading.show({
                  template:'Error in network connection, Please try again later...',
                  duration:3000
                });
            });
}])

.controller('HomeTabCtrl', ["$scope","$state","$ionicSideMenuDelegate","MMCFactory","$ionicLoading",function($scope,$state,$ionicSideMenuDelegate,MMCFactory,$ionicLoading) {

  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };




                        $ionicLoading.show();
                        MMCFactory.getAllActors()
                                      .success(function(data){
                                        $scope.actors = data.popular_actors;

                                        $ionicLoading.hide();
                                      })
                                      .error(function(err,statusCode){
                                        $ionicLoading.show({
                                           template:'Error in network connection, Please try again later...',
                                           duration:5000
                                        });
                                      });

                      var actorId = $state.params.personId;
                      $ionicLoading.show();
                      MMCFactory.getPerson(actorId)
                                .success(function(data){
                                   $scope.actor = data;
                                   console.log(data);
                                })
                                .error(function(err,statusCode){
                                  $ionicLoading.show({
                                    template:'Error in network connection, Please try again later...',
                                    duration:3000
                                  });
                                });


}])


.factory("MMCFactory",["$http",function($http){
  var MMCAPI = {

    getAllMovies:function(){
      return $http.get(base+"/all_movies_new.php");
    },

    getAllTVShows:function(){
      return $http.get(base+"/all_tvshows.php");
    },

    getAllActors:function(){
      return $http.get(base+"/all_people.php");
    },

    getMovie:function(movieId){
      return $http.get(base+"/movie_details.php?movieId="+movieId);
    },

    getShow:function(showId){
      return $http.get(base+"/tvshow_details.php?showId="+showId);
    },

    getPerson:function(actorId){
      return $http.get(base+"/people_details.php?actorId="+actorId);
    }
  }

  return MMCAPI;
}])
;
