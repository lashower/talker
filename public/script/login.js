app.controller('LoginController', function($scope,$http,User,$state) {
    $scope.username = "";
    $scope.password = "";
    $scope.message = null;

    $scope.login = function() {
        $http({
            transformRequest: angular.identity,
            method: 'POST',
            url: '/login',
            data: JSON.stringify({
                username: $scope.username,
                password: $scope.password
            })
        }).then(function(response) {
            if(!response.data.message)
            {
                User.setUser(response.data);
                $state.go('chat');
            }
            $scope.message = response.data.message;
        });
    };
});

