angular.module("Boards",["ngRoute"])
.controller("MainController",[require("./controllers/mainController")])
.controller("ProjectsController",["DAOService",require("./controllers/projectsController")])
.controller("ProjectController",["DAOService","$routeParams",require("./controllers/projectController")])
.config(['$sceDelegateProvider','$routeProvider','$locationProvider',require("./config")])
.service("DAOService",["$http",require("./services/daoService")]);