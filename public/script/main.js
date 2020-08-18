var app = angular.module('myApp', ['ui.router','ngWebSocket'])

app.factory('User', function($http,$q,$state) {
    var _user = {_id:-1};
    var service = {};

    service.getUser = function() {
        var deferred = $q.defer();
        if(_user._id == -1)
        {
            $http({
               transformRequest: angular.identity,
               method: 'GET',
               url: '/user/current'
            }).then(function(response) {
                _user = response.data;
                if(_user._id == -1)
                {
                    $state.go('login');
                }
                deferred.resolve(_user);
            });
        } else
        {
            deferred.resolve(_user);
        }
        return deferred.promise;
    }

    service.setUser = function(user) {
        _user = user;
    }

    return service;
})

app.factory('Chat', function($websocket,$location) {
    var ws = $websocket('ws://' + $location.host() + ':' + $location.port() + "/chat");

    var collection = [];
    ws.onOpen(function() {
        console.log('websocket is connected ...')
    });

    ws.onMessage(function(message) {
        var data = JSON.parse(message.data);
        data.added_date = new Date(data.added_date);
        collection.push(data);
    });

    var methods = {
        collection: collection,
        get: function() {
            ws.send(JSON.stringify({ action: 'get' }));
        },
        post: function(message) {
            ws.send(message);
        }
    };

    return methods;
})

app.controller('MainController', function($scope) {
});
