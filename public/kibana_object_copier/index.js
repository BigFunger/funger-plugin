define(function (require) {
  require('plugins/funger-plugin/services/objects');

  require('ui/routes')
  .when('/kibana_object_copier', {
    template: require('plugins/funger-plugin/kibana_object_copier/index.html'),
    resolve: {
      types: function (fungerPluginObjects) {
        return fungerPluginObjects.getTypes()
        .then(function(response) {
          return response;
        });
      }
    }
  });

  var app = require('ui/modules').get('app/kibana_object_copier', []);

  app.directive('kibanaObjectCopierApp', function () {
    return {
      restrict: 'E',
      scope: true,
      controller: function ($scope, $route, $timeout, fungerPluginObjects, Promise) {
        var that = this;
        var types = $scope.types = $route.current.locals.types;

        $scope.numberOfCopies = 1;
        $scope.$watch('type', updateObjects);

        $scope.controller = that;
        $scope.state = 'normal';
        $scope.submit = submitForm;
        $scope.testFunction = testFunction;

        //ask about specific indexes, in arrays not working... weird.
        function updateObjects() {
          return fungerPluginObjects.getObjects($scope.type)
          .then((getObjectsResult) => {
            $scope.objects = getObjectsResult;
          });
        }

        function submitForm() {
          var options = {
            type: $scope.type,
            object: $scope.object._id,
            numberOfCopies: $scope.numberOfCopies
          };
          fungerPluginObjects.copyObject(options)
          .then((response) => {
            $scope.state = response ? 'success' : 'fail';
          })
          .then(() => {
            // How to delay this until the records have been entered...
            $timeout(() => {
              $scope.state = 'normal';
              updateObjects();
            }, 2000);
          });
        }

        function testFunction() {
          updateObjects();
        }

        require('plugins/funger-plugin/funger.less');
        require('plugins/funger-plugin/kibana_object_copier/index.less');
      }
    };
  });
});

