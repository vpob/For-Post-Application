(function() {
	angular.module('posts-directives', [])

		.directive('navBar', function(){
	    return {
	      restrict: 'A',
	      templateUrl: 'views/nav-bar.html'
	    };
		})
		.directive('inptPost', function(){
	    return {
	      restrict: 'E',
	      templateUrl: 'views/inpt-post.html'
	    };
		})
		.directive('postedPost', function(){
	    return {
	      restrict: 'E',
	      templateUrl: 'views/posted-post.html'
	    };
		});
})();