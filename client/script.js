(function()
{
	'use strict';
	angular.module('app', ['ngRoute'])
		.config(config);
	config.$inject = ['$routeProvider', '$httpProvider'];
	function config($routeProvider, $httpProvider)
	{
		$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
		$routeProvider
			.when('/', {
				controller: 'mainController',
				templateUrl : '/pages/home/home.template.html'
			})
			.when('/contact', {
				controller : 'contactController',
				templateUrl : '/pages/contact/contact.template.html'
			})
			.otherwise({redirectTo: '/'});
	}
})();