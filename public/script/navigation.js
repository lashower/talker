app.config(function($stateProvider, $urlRouterProvider) {
    var mainState = {
        name : 'main',
        url : '/main',
        controller : 'MainController',
        templateUrl : 'main'
    }

    var loginState = {
        name : 'login',
        url : '/login',
        controller: 'LoginController',
        templateUrl : 'login'
    }

    var signupState = {
        name : 'signup',
        url : '/signup',
        controller: 'SignupController',
        templateUrl : 'signup'
    }
    var profileState = {
        name: 'profile',
        url : '/profile',
        controller: 'ProfileController',
        templateUrl:'profile'
    }
    var chatState = {
        name: 'chat',
        url: '/chat',
        controller: 'ChatController',
        templateUrl:'chat'
    }
    $stateProvider.state(mainState);
    $stateProvider.state(loginState);
    $stateProvider.state(signupState);
    $stateProvider.state(profileState);
    $stateProvider.state(chatState);
    $urlRouterProvider.otherwise('/main')
});
