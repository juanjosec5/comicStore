(function(){
    'use strict';

    angular
        .module('sharedModule')
        .controller('csLoginController', csLoginController)

    csLoginController.inject = [];
    function csLoginController(Dependencies){
        var vm = this;
        vm.init = init;

        function init(){
        }
    }
}());