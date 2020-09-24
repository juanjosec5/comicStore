(function(){
    'use strict';

    angular
        .module('coreModule')
        .service('comicsService', ComicsService)

    ComicsService.$inject = [
        'Restangular'
    ];

    function ComicsService(Restangular){
        return {
            getComics: getComics
        }

        function getComics() {
            return _comicsConfig().getList().then(function (comics) {
                return comics.plain();
            });
        }

        function _comicsConfig(){
            var comicsInstance = Restangular.one('comics');

            return comicsInstance;
        }
    }
}());
