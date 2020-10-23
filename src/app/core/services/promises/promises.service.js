(
    function(){
    'use strict';

    angular
        .module('coreModule')
        .service('promiseService', promiseService)

        promiseService.$inject = [
            '$q',
            '$timeout'
        ];

    function promiseService($q, $timeout){
        return {
            createdSyncPromise: createdSyncPromise,
            getRequest: getRequest,
            promiseTimer: promiseTimer,
            randomInterval: randomInterval,
            createRejectedPromise:createRejectedPromise,
            hola: hola,
            holaDos: holaDos,
            severalPromises: severalPromises,
            promiseRace: promiseRace
        }

        /**
         * $q es la dueña del when
         * $q.when retorna una promesa resuelta
         */
        function createdSyncPromise(arg) {
            return $q.when(arg);
        }

        function createRejectedPromise(arg) {
            return $q.reject(arg);
        }

        function getRequest(url) {
            var req = new XMLHttpRequest(),
                deferred = $q.defer();

            req.open('GET', url);

            req.onload = function() {
                // all status are handle here, even errors
                if(req.status === 200){
                    deferred.resolve(req.response);
                } else {
                    deferred.reject(req.statusText + 3);
                }
            };

            req.onerror = function() {
                // all network errors are handle here
                deferred.reject('Network Error');
            };
            req.send();

            return deferred.promise;
        }

        function promiseTimer(seg) {
                    var deferred = $q.defer();

            $timeout(function () {
                console.log('ya');
                deferred.resolve('done');
            }, seg);

            return deferred.promise;
        }

        function randomInterval() {
            var deferred = $q.defer(),
                turns = 0,
                num,
                intervalo = setInterval(function(){
                    num = Math.floor(Math.random() * 10);
                    console.log(num);
                    turns++;

                    if (num >= 7) {
                        deferred.resolve(true);
                        clearInterval(intervalo);
                    } else if (turns === 10){
                        deferred.reject(false);
                        clearInterval(intervalo);
                    }
                }, 1000);

            return deferred.promise;
        }

        function hola(timeout, callback) {
            var deferred = $q.defer();

            setTimeout(function () {
                callback(timeout, deferred);
            }, timeout);
        
            return deferred.promise;
        }

        function holaDos(timeout, deferred) {
            var xVar = timeout/1000,
                turns = 0,
                num;

            if (xVar === 1) {
                deferred.reject(false);
            } else if (xVar > 1 && xVar <= 3) {
                var interval = setInterval(function () {
                    turns++;
                    num = Math.floor(Math.random() * 10);
                    console.log(`turns: ${turns} randomNumer: ${num}`);
                    if (num >= 5) {
                        deferred.resolve('true, number was >= 5');
                        clearInterval(interval);
                    } else if(turns === 10){
                        deferred.reject('turnos vencidos');
                        clearInterval(interval);
                    }
                }, 1000);
            } else if (xVar > 3) {
                deferred.resolve('resuelto inmediatamente');
            }
        }

        function timeoutDos() {
            var deferred = $q.defer();

            $timeout(function () {
                console.log('timeout ya');
                deferred.resolve(true);
            }, 2000);

            return deferred.promise;
        }

        function severalPromises() {

            return $q.all({  
                firstPromise: timeoutDos(),
                secondPromise: promiseTimer(3000)
            }).then(function (res) {
                console.log('1',res);
                return res;
            });
        }

        function promiseRace() {
            $q.race({  
                firstPromise: timeoutDos(),
                secondPromise: promiseTimer(5000)
            }).then(function (res) {
                console.log(res);
            });
        }
    }
}());
