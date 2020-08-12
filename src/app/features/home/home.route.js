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
                templateUrl: '/features/home/home.template.html',
                controllerAs: 'homeVm'
            });
        }
})();
