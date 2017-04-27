angular.module("Boards",["ngRoute"])
.service("appService",[require("./services/appService")])
.controller("MainController",[require("./controllers/mainController")])
.controller("ProjectsController",["DAOService","appService",require("./controllers/projectsController")])
.controller("ProjectController",["DAOService","$routeParams","appService","$http",require("./controllers/projectController")])
.controller("UsController",["DAOService","$routeParams","appService","$http",require("./controllers/usController")])
.config(['$sceDelegateProvider','$routeProvider','$locationProvider',require("./config")])
.service("DAOService",["$http",require("./services/daoService")]);
