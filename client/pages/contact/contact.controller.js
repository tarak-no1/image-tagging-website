(function(){
	'use strict';
	angular
		.module('app')
		.controller('contactController', contactController);
	contactController.$inject = ['$scope'];
	function contactController($scope)
	{
		$scope.user_info = {};
	}
})();