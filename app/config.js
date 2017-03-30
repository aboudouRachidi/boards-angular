module.exports=function($sceDelegateProvider,$routeProvider,$locationProvider){
	$routeProvider.
	when('/home', {
		templateUrl: 'app/views/projects.html',
		controller: 'ProjectsController',
		controllerAs: 'projectsCtrl'
	}).
	when('/project/:_id', {
		templateUrl: 'app/views/project.html',
		controller: 'ProjectController',
		controllerAs: 'projectCtrl'
	});
	if(window.history && window.history.pushState){
		$locationProvider.html5Mode(true);
	}
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'http://http://127.0.0.1:8080/**'
	]);
};