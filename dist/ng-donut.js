(function main($angular, $d3) {

	"use strict";

	/**
	 * @method throwException
	 * @param message {String}
	 * @return {void}
	 */
	var throwException = function throwException(message) {
		throw "ngDonut: " + message;
	};

	if (typeof $angular === 'undefined') {
		throwException('Angular is a required library: https://angularjs.org/');
	}

	if (typeof $d3 === 'undefined') {
		throwException('D3 is a required library: http://d3js.org/');
	}

	/**
	 * @module ngDonut
	 * @author Adam Timberlake
	 * @link https://github.com/Wildhoney/ngDonut
	 */
	$angular.module('ngDonut', []).directive('donut', function ngDonut() {

		return {

			/**
			 * @property restrict
			 * @type {String}
			 */
			restrict: 'EA',

			/**
			 * @property require
			 * @type {String}
			 */
			require: 'ngModel',

			/**
			 * @property scope
			 * @type {Object}
			 */
			scope: {
				dataset: '=ngModel',
				height: '=',
				width: '=',
				radius: '=',
				colours: '='
			},

			/**
			 * @property controller
			 * @type {Array}
			 */
			controller: ['$scope', function controller($scope) {

				/**
				 * @property colour
				 * @type {Function}
				 */
				var colour = $d3.scale.category20();

				/**
				 * @property currentAngles
				 * @type {Object}
				 */
				$scope.currentAngles = {};

				/**
				 * @method getColour
				 * @param colourIndex {Number}
				 * @return {String}
				 */
				$scope.getColour = function getColour(colourIndex) {

					// Use the user defined colours if the developer has defined them, and the current index
					// is available.
					if ($scope.colours && $scope.colours.length > colourIndex) {
						return $scope.colours[colourIndex];
					}

					// ...Otherwise we'll fallback to using the D3 category 20 colours.
					return colour(colourIndex);

				};

				/**
				 * @method getTranslate
				 * @return {String}
				 */
				$scope.getTranslate = function getTranslate() {
					return 'translate(' + $scope.width / 2 + ',' + $scope.height / 2 + ')';
				};

				/**
				 * @method clean
				 * @param dataset {Array}
				 * @return {Array}
				 */
				$scope.clean = function clean(dataset) {

					var isNumber = new RegExp('\d+');

					return dataset.map(function map(value) {

						if (isNaN(Number(value))) {
							return 0;
						}

						return Number(value);
					});

				};

				/**
				 * @method tweenArc
				 * @param a
				 * @return {Function}
				 */
				$scope.tweenArc = function tweenArc(a) {

					var arc = d3.svg.arc().innerRadius($scope.radius - 100).outerRadius($scope.radius - 20),
						i   = d3.interpolate(this._current, a);

					this._current = i(0);

					return function donutTween(t) {
						return arc(i(t));
					};

				};

			}],

			/**
			 * @method link
			 * @param scope {Object}
			 * @param element {angular.element}
			 * @return {void}
			 */
			link: function link(scope, element) {

				var radius = Math.min(scope.width, scope.height) / 2,
					pie    = $d3.layout.pie().sort(null),
					arc    = $d3.svg.arc().innerRadius(radius).outerRadius(radius - scope.radius),
					svg    = $d3.select(element[0]).append('svg')
							    .attr('width', scope.width)
							    .attr('height', scope.height)
						        .append('g')
						        .attr('transform', scope.getTranslate()),
					path = svg.selectAll('path')
							  .data(pie(scope.clean(scope.dataset)))
							  .enter().append('path')
							  .attr('fill', function(d, i) { return scope.getColour(i); })
							  .attr('d', arc)
						      .each(function(d) { this._current = d; });

				/**
				 * @method tweenArc
				 * @param arcModel {Object}
				 * @return {Function}
				 */
				scope.tweenArc = function tweenArc(arcModel) {

					var i = $d3.interpolate(this._current, arcModel);
					this._current = i(0);
					return function(t) {
						return arc(i(t));
					};

				};

				// Listen for any changes to the dataset...
				scope.$watchCollection('dataset', function datasetChanged() {

					path.data(pie(scope.clean(scope.dataset)));
					path.transition().duration(750).attrTween("d", scope.tweenArc);


				});

			}

		};

	});

})(window.angular, window.d3);