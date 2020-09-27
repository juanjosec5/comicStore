(function() {
    'use strict';

    angular
        .module('comicsModule')
        .config(comicsRoute);

        comicsRoute.$inject = ['$stateProvider'];

        function comicsRoute($stateProvider) {

            $stateProvider.state({
                name: 'comics',
                url: '/comics',
                templateUrl: '/features/comics/comics.html',
                controller: 'comicsController',
                controllerAs: 'comicsVm',
                resolve: {
                    comicsData: comicsData,
                    isLoggedInData: isLoggedInData
                }
            });

            comicsData.$inject = [
                'comicsService', 
                'isLoggedInData'
            ];

            function comicsData(comicsService, isLoggedInData) {
                //getComics depends on isLoggedInData response
                console.log(isLoggedInData, 'bla');
                return comicsService.getComics();
            }

            isLoggedInData.$inject = [
                'usersService',
                '$q',
                '$state'
            ];

            function isLoggedInData(
                usersService, 
                $q, 
                $state
            ) {
                var isLogged = usersService.isLoggedIn();

                if (!isLogged) {
                    return usersService.openLoginModal().then(function (isLoggedIn) {
                        if(isLoggedIn){
                            return true;
                        }

                        $state.go('home');
                        return $q.reject(false);
                    });

                    //Una promesa rejectada en false se hace para no llegar al controller
                }

                return true;
            }
        }
})();
