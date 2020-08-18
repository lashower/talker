app.controller('SignupController', function($scope,$http,User,$state) {

    $scope.username = "";
    $scope.email = "";
    $scope.password = "";
    $scope.confirmPassword = "";
    $scope.signup = function() {
        $http({
            transformRequest: angular.identity,
            method: 'POST',
            url: '/signup',
                data: JSON.stringify({
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password,
                    confirmPassword: $scope.confirmPassword
                })
        }).then(function(response) {
            console.log(response.data);
            if(!response.data.message)
            {
                User.setUser(response.data);
            }
            $scope.message = response.data.message;
            $state.go('chat')
        });
    };

});

