(function() {
    'use strict';

    angular
        .module('comicsModule')
        .config(comicsRoute);

        comicsRoute.$inject = ['$stateProvider'];

        function comicsRoute($stateProvider) {

            $stateProvider.state({
                name: 'comics',
                url: '/comics',
                templateUrl: '/features/comics/comics.html',
                controller: 'comicsController',
                controllerAs: 'comicsVm'
            });
        }
})();
