(function() {
    'use strict';

    angular
        .module('loginModule')
        .config(loginRoute);

        loginRoute.$inject = ['$stateProvider'];

        function loginRoute($stateProvider) {

            $stateProvider.state({
                name: 'login',
                url: '/login',
                template: '<h1>Login</h1> <a href="/"></a>'
            });
        }
})();
