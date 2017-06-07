var app = angular.module("storyApp", []);
app.controller('storyAppController', ['$scope', '$http', function ($scope, $http) {
    $scope.refreshStories = function () {
        $http.get('https://hacker-news.firebaseio.com/v0/topstories.json').
            then(function (response) {
                $scope.stories = response.data;
                console.log(response.data);
            }, function (response) { console.log("ERROR:" + response.ExceptionMessage); });
    };

}]);