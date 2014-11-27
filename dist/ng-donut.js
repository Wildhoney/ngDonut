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
							  .data(pie(scope.dataset))
							  .enter().append('path')
							  .attr('fill', function(d, i) { return scope.getColour(i); })
							  .attr('d', arc);


			}

		};

	});

})(window.angular, window.d3);