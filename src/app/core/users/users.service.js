(function(){
    'use strict';

    angular
        .module('coreModule')
        .service('usersService', UsersService)

        UsersService.$inject = [
            'Restangular', 
            '$window',
            'modalFactory',
            '$q'
        ]

    function UsersService(Restangular, $window, modalFactory, $q) {

        return {
            registerUser: registerUser,
            loginUser: loginUser,
            isLoggedIn: isLoggedIn,
            openLoginModal: openLoginModal
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
                    return true;
                } else {
                    return false;
                }
            });
        }

        function isLoggedIn() {
            var userData = $window.sessionStorage.getItem('userLogged');

            return !!userData
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

        function openLoginModal() {
            var deferred = $q.defer(),
                loginModalOption = {
                    templateUrl: '/shared/modals/login/login.html',
                    controller: 'loginModalController',
                    controllerAs: 'loginModalVm',
                    resolve: {
                        modalData: {
                            title:'Login Modal Title',
                            actions: {
                                success: function (isLoggedIn) {
                                    console.log('success');
                                    deferred.resolve(isLoggedIn);
                                },
                                fail: function () {
                                    deferred.resolve(false);
                                    modalFactory.dismiss();
                                }
                            }
                        }
                    }
                };

            modalFactory.openModal(loginModalOption);
            return deferred.promise;
        }
    }
}());
