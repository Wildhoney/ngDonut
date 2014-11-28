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
         * @method setValues
         * @return {void}
         */
        $scope.setValues = function setValues() {

            $scope.donutModel = [
                { name: 'Adam', value: random() },
                { name: 'Maria', value: random() },
                { name: 'Jonathan', value: random() },
                { name: 'Gabriele', value: random() },
                { name: 'Artem', value: random() }
            ];

        };
        
        /**
         * @property donutModel
         * @type {Array}
         */
        $scope.donutModel = [];
        $scope.setValues();

        /**
         * @method openTooltip
         * @param model {Object}
         * @return {void}
         */
        $scope.openTooltip = function openTooltip(model) {
            console.log(model);
        };

        /**
         * @method closeTooltip
         * @return {void}
         */
        $scope.closeTooltip = function closeTooltip() {
            console.log('Close!');
        };

        /**
         * @property donutColours
         * @type {String[]}
         */
        // $scope.donutColours = ['red', 'green', 'blue', 'yellow', 'orange'];

    });

})(window.angular);