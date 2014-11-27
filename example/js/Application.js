(function main($angular) {

    // Бог тро́ицу лю́бит...
    $angular.module('donutApp', ['ngDonut']).controller('DonutController', function DonutController($scope) {

        /**
         * @property donutModel
         * @type {Array}
         */
        $scope.donutModel = [53245, 28479, 19697, 24037, 40245];

        /**
         * @property donutColours
         * @type {String[]}
         */
        $scope.donutColours = ['red', 'green', 'blue', 'yellow', 'orange'];

    });

})(window.angular);