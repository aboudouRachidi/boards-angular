module.exports=function(daoService,appService){
	var self=this;
	this.data={};
	this.projectsOwner=[];
	this.projectsWorker=[];
	daoService.loadAll(this.data,function(){
		var user=self.data["Developer"][0];
		appService.user = user;
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