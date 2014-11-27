(function($angular) {

    describe('ngRangeSlider', function() {

        beforeEach(module('ngDonut'));

        /**
         * @property donutModel
         * @type {Object}
         */
        var donutModel = [];

        /**
         * @method compileDirective
         * @return {Object}
         */
        var compileDirective = function compileDirective() {

            var scope, html = '<donut ng-model="model"></donut>',
                document    = '';

            inject(function inject($rootScope, $compile) {

                scope       = $rootScope.$new();
                scope.model = donutModel;
                document    = $compile(html)($angular.extend(scope));

            });

            return { scope: scope.$$childHead, html: document };

        };

        it('Should be able to initialise the SVG canvas;', function() {

            var html = compileDirective().html;
            expect(html.find('svg')).toBeDefined();

        });

    });

})(window.angular);