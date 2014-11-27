(function main($angular, $d3) {

	"use strict";

	/**
	 * @method throwException
	 * @param message {String}
	 * @return {void}
	 */
	var throwException = function throwException(message) {
		throw "ngDonut: " + message + ".";
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
	$angular.module('ngDonut', []).directive('ngDonut', function ngDonut() {

		return {

			/**
			 * @property restrict
			 * @type {String}
			 */
			restrict: 'EA',

			/**
			 * @method link
			 * @param scope {Object}
			 * @param element {angular.element}
			 * @return {void}
			 */
			link: function link(scope, element) {

				void(scope);
				void(element);

			}

		};

	});

})(window.angular, window.d3);