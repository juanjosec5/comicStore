(function(){
    'use strict';

    angular
        .module('coreModule')
        .service('usersService', UsersService)

        UsersService.$inject = [
            'Restangular', 
            '$window'
        ]

    function UsersService(Restangular, $window) {

        return {
            registerUser: registerUser,
            loginUser: loginUser
        }

        function registerUser(userData) {
            userData.password = userData.confirmPassword;
            delete userData.confirmPassword;
            delete userData.newPassword;
            _getUsersConfig().post(userData);
        }

        function loginUser(userData) {
            var userResponse;
            return _loginUserData().customGET('', userData).then(function (users) {
                userResponse = users.plain()[0];

                if (userResponse) {
                    $window.sessionStorage.setItem('userLogged', JSON.stringify(userResponse));
                    console.log('successful login')
                    return true;
                } else {
                    console.log('unsuccessful login')
                    return false;
                }
            });
        }

        function _getUsersConfig(){
            var userInstance = Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.addFullRequestInterceptor(function (elem, operation, what, url, headers) {

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

        function _loginUserData(){
            var userInstance = Restangular.one('users');

            return userInstance;
        }

        // function _test() {
        //     var userInstance = Restangular.service('users');
        //     return userInstance;
        // }
        // function _testTwo() {
        //     var userInstance = Restangular.withConfig(function (myConfig) {
        //         myConfig.setBaseUrl('https://google.com/');
        //     })
        //     return userInstance.service('users');
        // }
    }

}());
