module.exports = function(config) {
    config.set({
        
        frameworks: ['jasmine'],

        browsers: ['ChromeHeadless'],

        files: [
            'node_modules/angular/angular.js', 
            'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
            'node_modules/angular-animate/angular-animate.js', 
            'node_modules/angular-touch/angular-touch.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'node_modules/lodash/lodash.js',
            'node_modules/restangular/dist/restangular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.module.js',
            'src/**/*.js',
            'src/**/*.spec.js'
        ]
    })
}