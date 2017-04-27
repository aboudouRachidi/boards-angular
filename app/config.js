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
	}).
	when('/project/newUS/:_id', {
		templateUrl: 'app/views/newUs.html',
		controller: 'usController',
		controllerAs: 'usCtrl'
	}).
	when('/project/:_id/createUs', {
		templateUrl: 'app/views/newUs.html',
		controller: 'UsController',
		controllerAs: 'usCtrl'
	}).
	when('/home/createProject', {
		templateUrl: 'app/views/project/create.html',
		controller: 'ProjectController',
		controllerAs: 'projectCtrl'
	}).
	when('/home/editProject/:_id', {
		templateUrl: 'app/views/project/edit.html',
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