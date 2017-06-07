var app = angular.module("storyApp", []);
app.controller('storyAppController', ['$scope', '$http', function ($scope, $http) {
        
    $http.get('https://hacker-news.firebaseio.com/v0/topstories.json').
        then(function successCallback(response) {
            $scope.data = response.data;
            $scope.stories = [];
            $scope.storyData = [];
            var random = [];
            
            for (var i=0; i <= 9; i++)
            {
                random[i] = Math.floor(Math.random() * ($scope.data.length - 1));
                if (noDupes(random, random[i]))
                {
                    $scope.stories[i] = $scope.data[random[i]];
                }
                else 
                {
                    i--;
                }
                
            }

            PopulateStories($scope.stories);


        }, errorCallback);

        function PopulateStories (storyIDArray)
        {
            angular.forEach(storyIDArray, function (storyID, key)
            {

                $http.get('https://hacker-news.firebaseio.com/v0/item/' + storyID + '.json').
                    then(function successCallback2(response) {

                        $scope.storyData[key] = response.data;

                        $http.get('https://hacker-news.firebaseio.com/v0/user/' + $scope.storyData[key].by + '.json').
                            then(function (response){
                                $scope.storyData[key].authorKarma = response.data.karma;
                            }, errorCallback);

                    }, errorCallback);

            });

        }

        function noDupes (random, current)
        {
            var notADupe = true;
            for (i=0; i<random.length-1; i++)
            {
                if (random[i] === current)
                {
                    notADupe = false;
                }
            }
            return notADupe;
        }

        var errorCallback = function (response) 
        { 
            console.log("ERROR:" + response.ExceptionMessage); 
        }

}]);