(function() {
    'use strict';

    angular
        .module('comicStore')
        .config(mainRoute);

        mainRoute.$inject = ['$urlRouterProvider', '$locationProvider'];

        function mainRoute($urlRouteProvider, $locationProvider) {
            $locationProvider.hashPrefix(''); 
            $locationProvider.html5Mode(true);
            $urlRouteProvider.otherwise('/');
        }
})();
