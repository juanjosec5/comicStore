(function() {
    'use strict';

    angular
        .module('homeModule')
        .controller('homeController', homeController);

        homeController.$inject = ['promiseService'];

        function homeController(promiseService) {
            var vm = this;
            vm.title = 'test title'

            

            function getRequest() {
                promiseService.getRequest('http://localhost:3000/comicsa')
                    .then(function(comics) {
                        console.log(comics);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }


            function timerPromise() {
                promiseService.promiseTimer(3000).then(function (res) {
                    console.log(res);
                });
            }

            function intervalPromise() {
                promiseService.randomInterval()
                    .then(function (res) {
                        console.log(res);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }

            function newFunction(){
                promiseService.createdSyncPromise('true')
                    .then(function (res) {
                        console.log(res);
                    });
            }

            function newRejectedFunction(){
                promiseService.createRejectedPromise('rejectadisimo')
                    .catch(function (err) {
                        console.log(err);
                    })
            }

            function holaTest() {
                return promiseService.hola(1000, promiseService.holaDos)
                    .then(function (res) {
                        console.log(res);
                        return res;
                    });
            }

            function holaTestDos() {
                holaTest().then(function (res) {
                    console.log('holaTestDos', res);
                }).catch(function (res) {
                    console.log('2nd catch', res);
                })
            }

            function severalPromises() {
                return promiseService.severalPromises().then(function (value) {
                    if(value && value.firstPromise){
                        value.firstPromise = 'change 1';
                    }
                    console.log('2', value);
                    return value;
                });
            }

            function promiseRace() {
                promiseService.promiseRace();
            }

            function severalPromisesDos() {
                severalPromises().then(function (res) {
                    if(res && res.secondPromise === 'done'){
                        res.secondPromise = 'change 2';
                    }
                    console.log('3', res);
                    return res; 
                }).then(function (resDos) {
                    if(resDos && resDos.secondPromise){
                        delete resDos.secondPromise;
                    }
                    console.log('4', resDos)
                });
            }
            holaTestDos();
        }
})();
