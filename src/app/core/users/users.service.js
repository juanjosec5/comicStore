(function(){
    'use strict';

    angular
        .module('coreModule')
        .service('usersService', UsersService)

        UsersService.$inject = [
            'Restangular'
        ]

    function UsersService(Restangular) {

        return {
            registerUser: registerUser
        }
        

        function registerUser(userData) {
            // _test().post({name: 'TEST', email: 'TEST@email.com', password: 'TEST'});
            _getUsersConfig().post(userData);
        }

        function _getUsersConfig(){
            var userInstance = Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.addFullRequestInterceptor(function (elem, operation, what, url, headers) {
                    console.log(elem, operation, what, url, headers);

                    delete elem.name;

                    return {
                        element: elem,
                        headers: angular.extend(headers, {
                            'Specific-Token': '123'
                        })
                    };
                })
            })

            return userInstance.service('users');
        }

        // function _test() {
        //     var userInstance = Restangular.service('users');
        
        //     return userInstance;
        // }

        // function _testTwo() {
        //     var userInstance = Restangular.withConfig(function (myConfig) {
        //         myConfig.setBaseUrl('https://google.com/');
        //     })
        
        //     return userInstance.service('users');;
        // }
    }

}());


