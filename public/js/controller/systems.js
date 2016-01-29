//var redis = require("redis");

// Add your cache name and access key.
//var client = redis.createClient(6379,'iac-redis.redis.cache.windows.net', {auth_pass: 'o5f1Taf2OjBQFJJASkLk5UCIjp0rBtoIDDYz6300fBY=' });

//client.set("foo", "bar", function(err, reply) {
//    console.log(reply);
//});

//client.get("foo",  function(err, reply) {
  //  console.log(reply);
//});

var myApp = angular.module('myApp', ['jsTree.directive']);


var url = "http://fspqs44.fs.cummins.com:8080/QuickServeMobile/iac/catalog/optionsList.json?engineSerialNumber=79393426&esnType=NORMAL&Token=123456789&callBack=JSON_CALLBACK";

myApp.controller("TreeDemoCtrl", ['$scope', '$http', function($scope, $http) {
var cnt = 0;
var tmp = 0;
var tmp_1 = 0;
var details = [];
 $http.jsonp(url)
    .success(function(data){
        console.log(data);
		angular.forEach(data.options, function(note) {
			details.push({"id":cnt,
					   "parent":"#",
					   "text":note.text,
					  });
					  tmp = cnt;
					  if(note.children != undefined && note.children != null){	
						  angular.forEach(note.children, function(item) {
							
							cnt++;
							details.push({"id":cnt,
						   "parent":tmp,
						   "text":item.text,
							});
							 if(item.children != undefined && item.children != null){
								tmp_1 = cnt;
								angular.forEach(item.children, function(item_last) {
									cnt++;
									details.push({"id":cnt,
								   "parent":tmp_1,
								   "text":item_last.text,
								   "option":item_last.optionNumber,
								   "film":item_last.filmCard,
								   "plant":item_last.plantCode,
								   "spec":item_last.specGroup,
									});
								});
							}
								cnt++; 
						});
					}
					cnt++;
		});
		//$scope.treeModel = data;
		   
    });
	console.log(details);
	$scope.treeModel = details;
	$scope.readyCB = function(NODE, TREE_OBJ) {
		var film = TREE_OBJ.node.original.film; 
		var option = TREE_OBJ.node.original.option;
		var spec = TREE_OBJ.node.original.spec;
		var plant = TREE_OBJ.node.original.plant; 
		if(film != undefined && option != undefined && spec != undefined && plant != undefined){
		var href = '/partsCatalog.html?option='+option+'&film='+film+'&spec='+spec+'&plant='+plant;
		 document.location.href = href;
		 }
    };	
	
	
	/* (function(){
  	//test tree model 1
    $scope.roleList1 = [
        { "roleName" : "User", "roleId" : "role1", "children" : [
          { "roleName" : "subUser1", "roleId" : "role11", "children" : [] },
          { "roleName" : "subUser2", "roleId" : "role12", "children" : [
            { "roleName" : "subUser2-1", "roleId" : "role121", "children" : [
              { "roleName" : "subUser2-1-1", "roleId" : "role1211", "children" : [] },
              { "roleName" : "subUser2-1-2", "roleId" : "role1212", "children" : [] }
            ]}
          ]}
        ]},

        { "roleName" : "Admin", "roleId" : "role2", "children" : [] },

        { "roleName" : "Guest", "roleId" : "role3", "children" : [] }
      ];

  	//test tree model 2
    $scope.roleList2 = [
        { "roleName" : "User", "roleId" : "role1", "children" : [
          { "roleName" : "subUser1", "roleId" : "role11", "collapsed" : true, "children" : [] },
          { "roleName" : "subUser2", "roleId" : "role12", "collapsed" : true, "children" : [
            { "roleName" : "subUser2-1", "roleId" : "role121", "children" : [
              { "roleName" : "subUser2-1-1", "roleId" : "role1211", "children" : [] },
              { "roleName" : "subUser2-1-2", "roleId" : "role1212", "children" : [] }
            ]}
          ]}
        ]},

        { "roleName" : "Admin", "roleId" : "role2", "children" : [
          { "roleName" : "subAdmin1", "roleId" : "role11", "collapsed" : true, "children" : [] },
          { "roleName" : "subAdmin2", "roleId" : "role12", "children" : [
            { "roleName" : "subAdmin2-1", "roleId" : "role121", "children" : [
              { "roleName" : "subAdmin2-1-1", "roleId" : "role1211", "children" : [] },
              { "roleName" : "subAdmin2-1-2", "roleId" : "role1212", "children" : [] }
            ]}
          ]}
        ]},

        { "roleName" : "Guest", "roleId" : "role3", "children" : [
          { "roleName" : "subGuest1", "roleId" : "role11", "children" : [] },
          { "roleName" : "subGuest2", "roleId" : "role12", "collapsed" : true, "children" : [
            { "roleName" : "subGuest2-1", "roleId" : "role121", "children" : [
              { "roleName" : "subGuest2-1-1", "roleId" : "role1211", "children" : [] },
              { "roleName" : "subGuest2-1-2", "roleId" : "role1212", "children" : [] }
            ]}
          ]}
        ]}
      ];

      
      
    
    $scope.roleList = $scope.roleList1;
  
  }); */
 
//$scope.treeModel = details;

/* $('js-tree').jstree().bind("select_node.jstree", function (e, data) {
		 var href = 'http://143.222.33.39:4000/partsCatalog.html';
		 document.location.href = href;
	}); */
}]);

