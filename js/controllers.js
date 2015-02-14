'use strict';

var _ = require('underscore');

(function() {

	var myControllers = angular.module('controllers', []);

	/*
	 * Controller implementation regarding actions on the page scope.
	 * - Contains site-wide functionality and initializes parent scope.
	 */
	myControllers.controller('MainController', function($scope, $timeout) {

		$scope.persons = [];
		$scope.person = {};
		$scope.personEdited = {};
		$scope.socs = [];

		$scope.showAlert = false;
		$scope.alertAction = '';
		$scope.alerts = [
			{action: 'added', msg: 'Uusi henkilö lisätty onnistuneesti henkilötietorekisteriin.'},
			{action: 'edited', msg: 'Henkilötietojen muokkaus onnistui.'},
			{action: 'deleted', msg: 'Henkilö poistettu henkilötietorekisteristä.'}
		];

		/*
		 * Function to delete a selected person.
		 * - person: Person data.
		 */
		$scope.deletePerson = function(person) {

			var index = $scope.persons.indexOf(person);
			$scope.persons.splice(index, 1);
			index = $scope.socs.indexOf(person.socialsecurityNumber);
			$scope.socs.splice(index, 1);
			$scope.toggleAlert('deleted');
		}

		/*
		 * Function to bind form data with a correct person.
		 * - person: Person data.
		 */
		$scope.toggleEditPerson = function(person) {
			$scope.personEdited = _(person).clone();
		}

		/*
		 * Function to toggle alert visible.
		 */
		$scope.toggleAlert = function(type) {

			$scope.alertAction = type;
			$scope.showAlert = true;

			$timeout(function() {
				$scope.showAlert = false;	
			}, 2000);
		}

		/*
		 * Function to check alert type.
		 */
		$scope.checkType = function() {
			return $scope.alertAction;
		}


	});

	/*
	 * Controller implementation to add a person to the registry.
	 * - Contains functions regarding only adding persons.
	 */
	myControllers.controller('addFormController', function($scope) {
		/* 
		 * Function to add a person from the user interface.
		 * - person: Form data.
		 */
		$scope.addPerson = function(person) {
			$scope.addPersonForm.submitted = false;

			if ($scope.addPersonForm.$valid) {

				$scope.persons.push(person);
				$scope.socs.push(person.socialsecurityNumber);
				$scope.toggleAlert('added');
				$scope.resetData();

			} else {
				$scope.addPersonForm.submitted = true;
			}
		}

		/*
		 * Function to clear form data.
		 */
		$scope.resetData = function() {
			$scope.person = {};
			$scope.personEdited = {};
			$scope.addPersonForm.$setPristine();
		}
	});

	/*
	 * Controller implementation to edit a person in the registry.
	 * - Contains functions regarding only editing persons.
	 */
	myControllers.controller('editFormController', function($scope) {
		/*
		 * Function to edit a selected person.
		 * - personEdited: Person data that's been submitted by the user.
		 */
		$scope.editPerson = function(personEdited) {

			if ($scope.addPersonForm2.$valid) {

				$scope.toggleAlert('edited');
				var objectFound = _.find($scope.persons, function(person) {
					return person.socialsecurityNumber == personEdited.socialsecurityNumber;
				});

				var index = _.indexOf($scope.persons, objectFound);
				$scope.persons[index] = personEdited;
				$scope.addPersonForm2.$setPristine();
			}
		}
	});

})();
