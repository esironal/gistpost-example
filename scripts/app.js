angular.module('githubEx', ['ngResource', 'ngSanitize'])
  .controller('MainCtrl', ['$scope', '$resource', '$sce',
    function($scope, $resource, $sce) {
      var Gist = $resource('https://api.github.com/gists');
      $scope.viewSource = false;
      $scope.result = null;
      $scope.text = '';

      $scope.toggleSource = function() {
        $scope.viewSource = !$scope.viewSource;
      };

      //post a gist
      $scope.postGist = function() {
        var text = $scope.text;
        var gist = new Gist({
          description: 'test gist',
          public: true,
          files: {
            "file1.txt": {
              content: text
            }
          }
        });
        gist.$save(function(gist, respHeader) {
          console.log(gist);
          $scope.result = gist;
          gist.html_url = $sce.trustAsUrl(gist.html_url);
        });
      };
    }
  ]);
