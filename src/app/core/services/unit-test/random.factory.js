(function(){
    'use strict';

    angular
        .module('coreModule')
        .factory('randomFactory', randomFactory)

    function randomFactory(){

        return {
            greaterThan: greaterThan
        }

        function greaterThan(numArray, orderDesc){
            if(!numArray || numArray.length === 0){
                return null;
            } else {
                return numArray.sort( function (a,b) {
                    return orderDesc ? b-a : a-b;
                });
            }
        }
    }
}());
