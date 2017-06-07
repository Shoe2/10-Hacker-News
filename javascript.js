var app = angular.module("storyApp", []);
app.controller('storyAppController', ['$scope', '$http', function ($scope, $http) {
        
    $http.get('https://hacker-news.firebaseio.com/v0/topstories.json').
        then(function successCallback(response) {
            $scope.data = response.data;
            $scope.stories = [];
            $scope.storyData = [];
            
            for (var i=0; i <= 9; i++)
            {
                var random = Math.floor(Math.random() * ($scope.data.length - 1));
                $scope.stories[i] = $scope.data[random];
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

                    }, errorCallback);

                // $http.get('https://hacker-news.firebaseio.com/v0/user/' + $scope.storyData.by + '.json').
                //     then(function (){
                //         //$scope.storyData[key].authorKarma = response.data;
                //         console.log(response.data);
                //     }, errorCallback);
                
            });
        }



        var errorCallback = function (response) 
        { 
            console.log("ERROR:" + response.ExceptionMessage); 
        }

}]);