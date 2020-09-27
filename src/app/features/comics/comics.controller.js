(function() {
    'use strict';

    angular
        .module('comicsModule')
        .controller('comicsController', comicsController);

        comicsController.$inject = [
            'comicsData'
        ];

        function comicsController( comicsData) {
            var vm = this;
            vm.title = 'comics test title'
            vm.comicsData = comicsData;
        }
})();
