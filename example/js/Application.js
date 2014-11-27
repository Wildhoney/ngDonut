(function main($angular) {

    // Бог тро́ицу лю́бит...
    $angular.module('donutApp', ['ngDonut']).controller('DonutController', function DonutController($scope) {

        /**
         * @method random
         * @return {Number}
         */
        var random = function random() {
            return Math.round(Math.random() * 100);
        };
        
        /**
         * @property donutModel
         * @type {Array}
         */
        $scope.donutModel = [random(), random(), random(), random(), random()];

        /**
         * @property donutColours
         * @type {String[]}
         */
        // $scope.donutColours = ['red', 'green', 'blue', 'yellow', 'orange'];

    });

})(window.angular);