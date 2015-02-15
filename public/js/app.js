// Browserify bundle
var controllers = require('./controllers');

(function() {
	
	var app = angular.module("myApp", ["controllers"]);
	
	app.directive('listPersonsView', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/view-list-persons.html'
	    };
	});

	app.directive('addPersonView', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/view-add-person.html'
	    };
	});

	app.directive('editPersonView', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/view-edit-person.html'
	    };
	});

	// Social security number validation.
	app.directive('duplicate', function () {
		var _ = require('underscore');

		var linker = function (scope, elm, attrs, ctrl) {
	     
			// Add custom validation to parsers.
	        ctrl.$parsers.unshift(function (viewValue) {

	        	// Find if social security number is unique.
	        	objectFound = _.find(scope.socs, function(item) {
					return item == viewValue;
				});
	            
	            // Returning undefined from the parser means an error occured.
	            if (objectFound) {
	                ctrl.$setValidity('duplicate', false);
	                return undefined;
	            } else {
	                ctrl.$setValidity('duplicate', true);
	                return viewValue;
	            }
	        });
	    }

	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: linker
	    };
	});

})();
