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