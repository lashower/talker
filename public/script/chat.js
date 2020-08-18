app.controller('ChatController', function($scope,User,Chat) {

    $scope.user = {};
    $scope.message = "";
    $scope.sortReverse = true;
    $scope.getUser = function() {
        User.getUser().then(function(user) {
            $scope.user = user;
        });
    }
    $scope.sendMessage = function() {
        Chat.post($scope.message);
        $scope.message = "";
    }

    $scope.check = function(ev) {
        if(ev.key == "Enter")
        {
            $scope.sendMessage();
        }
    }
    $scope.getUser();
    $scope.messages = Chat.collection;
    Chat.get();

});
