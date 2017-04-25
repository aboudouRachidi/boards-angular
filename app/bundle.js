(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module("Boards",["ngRoute"])
.controller("MainController",[require("./controllers/mainController")])
.controller("ProjectsController",["DAOService",require("./controllers/projectsController")])
.controller("ProjectController",["DAOService","$routeParams",require("./controllers/projectController")])
.config(['$sceDelegateProvider','$routeProvider','$locationProvider',require("./config")])
.service("DAOService",["$http",require("./services/daoService")]);
},{"./config":2,"./controllers/mainController":3,"./controllers/projectController":4,"./controllers/projectsController":5,"./services/daoService":6}],2:[function(require,module,exports){
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
		controller: 'USController',
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
},{}],3:[function(require,module,exports){
module.exports=function(){
	var self=this;
	var message="Bienvenue !";
	this.showMessage=function(){
		return message;
	};
};
},{}],4:[function(require,module,exports){
module.exports=function(daoService,$routeParams,$http){
	var self=this;
	this.data={};
	this.projectId=$routeParams._id;
	this.loaded=false;
	this.project={};
	if(!this.loaded)
		daoService.loadAll(this.data,function(){self.load();self.loaded=true;});
	else
		this.load();
	this.load=function(){
		self.project=daoService.getById(this.data["Project"],self.projectId);
	};
	this.setDev=function(dev,story){
		
	};
	this.removeDev=function (dev){
		
	};
	
	this.click=function(){
		$("#ddDev-B22").dropdown();
	};
	
	
	this.modifUS=function(){
		$('#modalModif')
		.modal('show')
		;
	};
	
	
	this.addUS=function(){
		$('#modalCreate')
		.modal('show')	
		;
	};
	

	this.createUS=function(){
		
		daoService.post("Story",self.project,function (resp){console.log(resp)});
	     	
	};
	
	this.addRow=function(){
		self.tasks.rows.push();
		
		
		
	}
	
	
	this.dropdown=function(code){
		$("#ddDev-"+code).dropdown();
	};
	/*daoService.get(this.data,"Project","/"+this.projectId,"Project",function(project){
		daoService.get(project,"Story","?filter={'project._id':"+JSON.stringify(project._id)+"}","stories");
		console.log("?filter={'project._id':"+JSON.stringify(project._id)+"}");
	})*/;
};
},{}],5:[function(require,module,exports){
module.exports=function(daoService){
	var self=this;
	this.data={};
	this.projectsOwner=[];
	this.projectsWorker=[];
	daoService.loadAll(this.data,function(){
		var user=self.data["Developer"][0];
		self.projectsOwner=daoService.getElementsByCallback(self.data["Project"],function(project){
			if(project.owner!=undefined)
				return project.owner._id.$oid==user._id.$oid;
			return false;
		});
		self.projectsWorker=daoService.getElementsByCallback(self.data["Project"],function(project){
			if(project.stories!=undefined){
				for(var i=0;i<project.stories.length;i++){
					if(project.stories[i].developer && project.stories[i].developer._id.$oid==user._id.$oid)
						return true;
				}
			}
			return false;
		});
	});
};
},{}],6:[function(require,module,exports){
module.exports=function($http){
	var self=this;
	this.data={};
	var server="http://127.0.0.1:8080/boards/";
	
	this.get=function(response,collection,query,member,callback){
		if(query==undefined)
			query="";
		if(member==undefined)
			member=collection;
		$http.get(server+collection+query).then(function(resp){
			if(resp.data["_embedded"]!=undefined)
				response[member]=resp.data["_embedded"];
			else
				response[member]=resp.data;
			self.data[member]=response[member];
			if(callback!=undefined){
				callback(response[member]);
			}
		});
	};
	
	this.getById=function(collection,$oid){
		var length=collection.length
		for(var i=0;i<length;i++){
			if(collection[i]._id.$oid==$oid)
				return collection[i];
		}
	}
	
	this.getElementsByCallback=function(collection,callback){
		var length=collection.length
		var result=[]
		for(var i=0;i<length;i++){
			if(callback(collection[i]))
				result.push(collection[i]);
		}
		return result;
	};
	
	this.post = function (collection,object,callback) {
		   $http.post(server+collection,object).then(function(resp){
		      if(callback!=undefined){
		         callback(resp);
		      }
		   });
		}
	
	this.loadAll=function(data,callback){
		self.get(data,"Project","","Project",function(projects){
			self.get(data,"Story","","stories",function(stories){
				stories.forEach(function(story){
					story.closed=function(){
						if(story.tasks!=undefined){
							var taskLength=story.tasks.length;
							var nbClose=0;
							for(var i=0;i<taskLength;i++){
								if(story.tasks[i].closed)
									nbClose++;
							}
							return nbClose==taskLength;
						}
						return false;
					};
					if(story.project!=undefined){
						var project=self.getById(projects,story.project._id.$oid);
						if(project!=undefined){
							if(project.stories==undefined)
								project.stories=[];
							project.stories.push(story);
						}
					}
				});
				self.get(data,"Developer","","Developer",function(){
					if(callback!=undefined){
						callback();
					}
				});
			});
		});
	};
	
	
};
},{}]},{},[1]);
