(function() {
    'use strict';

    angular
        .module('comicsModule')
        .controller('comicsController', comicsController);

        comicsController.$inject = [];

        function comicsController() {
            var vm = this;
            vm.title = 'comics test title'
        }
})();
