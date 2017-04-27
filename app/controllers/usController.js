module.exports=function(daoService,$routeParams,appService,$http){
	var self=this;
	this.data={};
	this.projectId=$routeParams._id;
	this.loaded=false;
	this.project={};
	this.story={};
	if(!this.loaded)
		daoService.loadAll(this.data,function(){self.load();self.loaded=true;});
	else
		this.load();
	this.load=function(){
		self.project=daoService.getById(this.data["Project"],self.projectId);
	};

	this.createStory=function () {
		self.story.project = self.project;
		daoService.post("Story",self.story,function (resp) {
			console.log(resp)
		});
	};
	
	
}