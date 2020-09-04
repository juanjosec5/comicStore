(function(){
    'use strict';

    angular
        .module('coreModule')
        .config(restangularConfig)

        restangularConfig.$inject = [
            'RestangularProvider'
        ];

    function restangularConfig(RestangularProvider){
        RestangularProvider.setBaseUrl('http://localhost:3000/');
        RestangularProvider.addFullRequestInterceptor(function (elem, operation, what, url, headers, params, element, httpConfig) {
            console.log(elem, operation, what, url, headers, params, element, httpConfig);
            
            return {
                headers: angular.extend(headers, {
                    'Guest-Token': 'abc'
                })
            };
        });
    }
}());
