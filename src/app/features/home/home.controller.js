(function() {
    'use strict';

    angular
        .module('homeModule')
        .controller('homeController', homeController);

        homeController.$inject = [];

        function homeController() {
            var vm = this;
            vm.title = 'test title'
        }
})();
