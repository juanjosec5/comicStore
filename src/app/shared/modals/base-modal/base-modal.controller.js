(function(){
    'use strict';

    angular
        .module('sharedModule')
        .controller('baseModalController', baseModalController)

    baseModalController.$inject = ['modalFactory', 'modalData'];

    function baseModalController(modalFactory, modalData){
        var vm = this;

        vm.actions = modalFactory;
        vm.modalData = modalData;

        console.log(modalData);
    }
}());
