app.controller('ProfileController', function($scope,User,$state) {

    $scope.user = {};
    $scope.getUser = function() {
        User.getUser().then(function(user) {
            $scope.user = user;
        });
    }

    $scope.getUser();

});

