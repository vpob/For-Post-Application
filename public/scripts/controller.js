(function() {
angular.module('PostsApp', ['posts-directives'])

	.controller('postsCtrl', function($scope, $http){

		$scope.sortBtn = ['Newest', 'Oldest', 'Random'];
		$scope.selectedIndex = 0;

		$scope.SelectView = function($index){
			$scope.selectedIndex = $index;
			refreshPostLists($scope.selectedIndex);
		};
		
		function refreshPostLists(arg){
			$http.get('/postslist' + arg).success(function(response){
					$scope.postList = response;
					$scope.newPost = '';
			});
		};

		refreshPostLists($scope.selectedIndex);

		$scope.addPost = function(){
	   $http.post('/postslist', $scope.newPost).success(function(response){
	   			refreshPostLists($scope.selectedIndex);
			});
		};
	});
})();