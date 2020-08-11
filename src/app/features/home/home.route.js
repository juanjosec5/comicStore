(function() {
    'use strict';

    angular
        .module('homeModule')
        .config(homeRoute);

        homeRoute.$inject = ['$stateProvider'];

        function homeRoute($stateProvider) {

            $stateProvider.state({
                name: 'home',
                url: '/',
                template: '<h1>Home</h1> <br /><a ui-sref="login">login</a>'
            });
        }
})();
