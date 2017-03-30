module.exports=function(daoService,$routeParams){
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
	
	this.dropdown=function(code){
		$("#ddDev-"+code).dropdown();
	};
	/*daoService.get(this.data,"Project","/"+this.projectId,"Project",function(project){
		daoService.get(project,"Story","?filter={'project._id':"+JSON.stringify(project._id)+"}","stories");
		console.log("?filter={'project._id':"+JSON.stringify(project._id)+"}");
	})*/;
};